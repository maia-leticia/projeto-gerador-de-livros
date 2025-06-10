export async function buscarFraseAleatoria(){
    try{
        const res=await fetch("https://api.quotable.io/random")
        const data = await res.json()
        return{
            frase: data.content,
            autor: data.author,
        }
    } catch(err){
        console.error("Erro ao buscar frase", err)
        return {
            frase: "A leitura é para a mente o que o exercício é para o corpo.",
            autor: "Joseph Addison",
        }
    }
}