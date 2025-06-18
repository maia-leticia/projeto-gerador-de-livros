
'use client'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";
import Resultados from "@/components/Resultados";
import { useState } from 'react';



export default function Teste(){
    const [livroRecomendado, setLivroRecomendado] = useState<{ livro: string | null; autor: string | null; descricao: string | null; message?: string } | null>(null);
    const handleQuizSubmit = (resultado: { livro: string | null; autor: string | null; descricao: string | null; message?: string }) => {
            console.log("Resultado do Quiz recebido no TestePage:", resultado);
            setLivroRecomendado(resultado); 
            if (resultado.livro && resultado.autor) {
                alert(`Livro recomendado: "${resultado.livro}" por ${resultado.autor} é ${resultado.descricao}`);         
            } else {
                alert(`Não foi possível recomendar um livro: ${resultado.message || "Erro desconhecido."}`);
            }
        };
        const handleResetQuiz = () => {
        setLivroRecomendado(null); 
    };
        return(
            <main>
                <Header/>
                {livroRecomendado===null ? (
                    <Quiz onSubmit={handleQuizSubmit}/>
                ) : (
                    <Resultados data={livroRecomendado} onResetQuiz={handleResetQuiz}/>
                )

                }      
                <div className='bg-[#EDEBE4] w-[100%] h-[15vw]'></div>
        
                <Footer/>
            
            </main>
        )
}