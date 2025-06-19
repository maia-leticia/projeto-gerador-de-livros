import Image from 'next/image';
import book from "@/../public/img/book.png";
import { useEffect, useState } from 'react';
import { recomendarLivro } from "@/lib/recomendarLivro";

type Props = {
    data: {
    livro: string | null;
    autor: string | null;
    descricao: string | null;
    message?: string ;
  };
  onResetQuiz: ()=>void
}

export default function Resultados({data, onResetQuiz}:Props){

  const [capa, setCapa] = useState<string | null>(null);

  useEffect(() => {
    async function buscarCapa() {
      const resultado = await recomendarLivro(data.livro);
      setCapa(resultado?.capa || null);
    }
    buscarCapa();
  }, [data.livro]);

    return(

        <main className='pt-[5vw]'>
            
             {data.autor == "" ? (
                <div className='flex items-center justify-center pb-10' id='home'>
                <div className='flex items-center justify-center gap-15'>
                <div className='w-[60vw]'>
                    <h2 className='text-[3vw]'>Desculpe não encontramos o livro perfeito para você :(</h2>
                    <p className='text-[1vw] pt-[0.8vw] pb-[4vw]'>Tente novamente, não desista!</p>
                    <div
                        onClick={onResetQuiz}
                        className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center cursor-pointer hover:bg-gray-100' 
                    >
                        Tentar de novo
                    </div>
                </div>
                
                </div>
            </div>
        ) : (
            <div className='flex items-center justify-center pb-10' id='home'>
                <div className='flex items-center justify-center gap-15'>
                <div className='w-[25vw] hidden sm:flex'>
                    <Image  width={200} height={300} src={capa || book} alt={data.livro} />
                </div>
                <div className='w-[25vw]'>
                    <h2 className='text-[3vw]'>{data.livro}</h2>
                    <h2 className='text-[2vw]'>Por: {data.autor}</h2>
                    <p className='text-[1vw] pt-[0.8vw] pb-[4vw]'>{data.descricao}</p>
                    <div
                        onClick={onResetQuiz} 
                        className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center cursor-pointer hover:bg-gray-100'
                    >
                        Novo quiz
                    </div>
                </div>
                
                </div>
            </div>
        )

        }
            
        </main>
    )
}