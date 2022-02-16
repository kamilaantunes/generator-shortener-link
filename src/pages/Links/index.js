import {useState, useEffect} from 'react'
import './links.css'
import {FiArrowLeft, fiArrowLeft, FiLink, FiTrash} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import {getLinksSave, deleteLink} from '../../services/storeLink'
import LinkItem from '../../components/LinkItem'

export default function Links(){
    const [myLinks, setMyLinks] = useState([])

    const [data, setData] = useState({})
    const [showModal, setShowModal] = useState(false)

    const [emptyList, setEmptyList] = useState(false)

    useEffect(() => {
        async function getLinks(){
            const result = await getLinksSave('@encurtaLink')
            // console.log(result)

            if (result.length === 0){
                //Quando a lista estiver vazia
                // console.log("Lista vazia!")
                setEmptyList(true)
            }
            setMyLinks(result)
        }

        getLinks()
        
        // alert("TESTE CARREGADO")
    }, [])

    function handleOpenLink(Link){
        setData(Link)
        setShowModal(true)
        // console.log(Link)
    }

    async function handleDelete(id){
        // console.log("Você clicou no id " + id)
       const result = await deleteLink(myLinks, id)

       if (result.length === 0){
        //    console.log("Links insuficientes.")
        setEmptyList(true)
       }
       setMyLinks(result)
    }

    return(
        <div className='links-container'>
            <div className='links-header'>
                <Link to={"/"}>
                    <FiArrowLeft size={38} color="#FFF"/>
                </Link>
                <h1> Meus Liinkiis </h1>
            </div>

            {emptyList && (
                <div>
                    <h2 className='empty-text'> Sua lista está vazia ):</h2>
                </div>
            )}

           {myLinks.map(Link => (
                <div key={Link.id} className='links-item'>
                    <button className='link' onClick={() => handleOpenLink(Link)}>
                        <FiLink size={18} color="#FFF"/>
                        {Link.long_url}
                    </button>

                    <button className='link-delete' onClick={() => handleDelete(Link.id)}>
                        <FiTrash size={24} color="#FF5454"/>
                    </button>
                </div>
           ))}

           {showModal && (
               <LinkItem 
                    closeModal={() => setShowModal(false)}
                    content={data}
               />
           )}

        </div>
    )
}