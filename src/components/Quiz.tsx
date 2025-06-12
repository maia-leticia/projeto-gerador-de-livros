'use client'
import { useState } from 'react'
import Image from 'next/image';
import book from "@/../public/img/book.png";
type Pergunta = {
    id: string
    texto: string
    opcoes: string[]
}

 const perguntas: Pergunta[] = [
        {
    id: "genero",
    texto: "Qual gênero você mais gosta?",
    opcoes: ["Romance", "Suspense", "Ficção científica", "Fantasia", "Autoajuda"],
  },
  {
    id: "humor",
    texto: "Você prefere livros com um toque de humor?",
    opcoes: ["Sim", "Não", "Indiferente"],
  },
  {
    id: "complexidade",
    texto: "Você quer uma leitura mais leve ou densa?",
    opcoes: ["Leve", "Densa", "Tanto faz"],
  },
  {
    id: "ambientacao",
    texto: "Você prefere histórias ambientadas em que época?",
    opcoes: ["Atual", "Futurista", "Histórica", "Não importa"],
  },
  {
    id: "protagonista",
    texto: "Você se interessa mais por protagonistas...",
    opcoes: ["Femininos", "Masculinos", "Tanto faz"],
  },
];

type Props = {
    onSubmit: (respostas: Record<string, string>) => void;
}



export default function Quiz({onSubmit}:Props){

   
    const [indice, setIndice]=useState(0)
    const [respostas, setRespostas]=useState<Record<string,string>>({})
    const pergunta = perguntas[indice]
    const [respostaAtual, setRespostaAtual] = useState('')
    const[error, setError]=useState(" ")

    const handleSelecionar=(opcao:string)=>{
    setRespostas((prev)=>({...prev, [pergunta.id]: opcao}))
    }

    const handleAvancar=()=>{
        setError(" ")
        if(!respostas[pergunta.id]){
            setError("Escolha uma alternativa!")
            return
        }
        if (indice < perguntas.length-1){
            setIndice(indice+1)
        } else{
            onSubmit(respostas)
        }
    }

    return(
        <div className='bg-[#F3F2EC] '>
            <div className='flex items-center justify-center gap-15'>
                <div className='w-[40vw]'>
                    <h2 className='text-[#222222] text-[3vw]'>{pergunta.texto}</h2>
                    <div className='grid grid-cols-2 pt-[0.8vw] pb-[4vw] leading-[3.5vw]'>
                        {
                            pergunta.opcoes.map((opcao)=>(
                                <label
                                key={opcao}
                                onClick={()=> handleSelecionar(opcao)}
                                className='flex text-[#7A7A7A] text-[1.5vw] gap-[1vw]'
                                >
                                    <input 
                                    type="radio" 
                                    value={opcao} 
                                    checked={respostaAtual === opcao}
                                    onChange={(e) => setRespostaAtual(e.target.value)}
                                    className='w-[1.3vw] accent-[#74642F]'
                                    />
                                    {opcao}
                                </label>
                            ))
                        }
                    </div>
                    
                    <p className={`text-[1vw] text-[red]`}>{error}</p>
                    <button
                    onClick={handleAvancar}
                    
                    className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center cursor-pointer'
                    >
                        {indice === perguntas.length -1 ? "Avançar" : "Enviar"}
                    </button>
                </div>
                <div className='w-[25vw] hidden sm:flex'>
                     <Image src={book} alt='livro-representativo'/>
                </div>
            </div>

            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}