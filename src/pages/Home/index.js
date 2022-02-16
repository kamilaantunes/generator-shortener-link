import { useState } from 'react'
import {FiLink} from 'react-icons/fi'
import './home.css'

import Menu from '../../components/Menu'
import LinkItem from '../../components/LinkItem'

import api from '../../services/api'
import {saveLink} from '../../services/storeLink'

export default function Home(){
    const [link, setLink] = useState('')
    const [data, setData] = useState('')
    const [showModal, setShowModal] = useState(false)

    async function handleShortLink(){
        try{
            const response = await api.post('/shorten', {
                long_url: link
            })

            // console.log(response.data);

            setData(response.data)
            setShowModal(true)

            saveLink('@encurtaLink', response.data)


            

            setLink('')

        }catch{
            alert("Ops parece que algo deu errado :(")
            setLink('')
        }
    }

    return(
        <div className='container-home'>
            <div className='logo'>
                <img src="/logo.png" alt='logo'/>
                <h1> Liinkii </h1>
                <span> Cole seu link para encurtar 👇 </span>
            </div>

            <div className='area-input'>
                <div>
                    <FiLink size={24} color="#FFF"/>

                    <input 
                        placeholder='cole seu link aqui'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <button onClick={handleShortLink}> Gerar link </button>
            </div>

            <Menu />

            {/* renderizar o modal de link gerado */}
            {showModal && (
                <LinkItem 
                    closeModal={ () => setShowModal(false)}
                    content={data}
                />
            )}


        </div>
    )
}