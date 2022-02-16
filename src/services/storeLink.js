// Buscar os links salvos
export async function getLinksSave(key){
    const myLinks = await localStorage.getItem(key)

    let linksSaves = JSON.parse(myLinks) || []

    return linksSaves;
}

// Salvar um link no localStorage
export async function saveLink(key, newLink){
    let linksStored = await getLinksSave(key)

    //Se já tiver um link com o mesmo ID, não permitir duplicada
    const hasLink = linksStored.some(link => link.id === newLink.id)

    if(hasLink){
        console.log("Link já existente na lista!")

        return;
    }

    //Adicionar novo link na lisra
    linksStored.push(newLink)
        await localStorage.setItem(key, JSON.stringify(linksStored))
        console.log("Link salvo com sucesso!")
}

// Deletar algum link salvo
export function deleteLink(links, id){
    let myLinks = links.filter(item => {
        return (item.id !== id)
    })

    localStorage.setItem('@encurtaLink', JSON.stringify(myLinks))

    console.log("Link deletado com sucesso!")

    return myLinks;
}