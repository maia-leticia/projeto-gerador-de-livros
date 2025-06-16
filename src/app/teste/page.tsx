
'use client'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";
import { useState } from 'react';



export default function teste(){
const [livroRecomendado, setLivroRecomendado] = useState<{ livro: string | null; autor: string | null; message?: string } | null>(null);
const handleQuizSubmit = (resultado: { livro: string | null; autor: string | null; message?: string }) => {
        console.log("Resultado do Quiz recebido no TestePage:", resultado);
        setLivroRecomendado(resultado); // Armazena o resultado no estado

        // Exemplo de como você pode lidar com a exibição aqui
        if (resultado.livro && resultado.autor) {
            alert(`Livro recomendado: "${resultado.livro}" por ${resultado.autor}`);
            // Aqui você pode adicionar lógica para navegar para outra página,
            // ou mostrar um componente diferente com os detalhes do livro.
        } else {
            alert(`Não foi possível recomendar um livro: ${resultado.message || "Erro desconhecido."}`);
        }
    };
    
    return(
        <main>
            <Header/>
            <Quiz onSubmit={handleQuizSubmit}/>
           <Footer/>
        </main>
    )
}