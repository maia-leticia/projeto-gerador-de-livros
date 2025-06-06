'use client';
import Link from 'next/link';
import Image from 'next/image';
import Header from "@/components/Header";
import book from "@/../public/img/book.png";
import CardBook from "@/components/CardBook";
import { buscarLivrosPorEstilo } from "@/lib/googleBooks";
import { useEffect, useState } from 'react';


export default function Home() {

  const [genero, setGenero] = useState("a")
  const [livros, setLivros] = useState([]);

  useEffect(()=>{
    async function carregarLivros(){
      const dados = await buscarLivrosPorEstilo(genero)
      setLivros(dados)
    }

    carregarLivros()
  }, [genero])


  return (
    <main className='bg-[#F3F2EC] '>
      <Header/>
      <div className='flex items-center justify-center pb-10'>
        <div className='flex items-center justify-center gap-15'>
          <div className='w-[25vw]'>
            <h2 className='text-[4vw]'>Descubra sua próxima leitura</h2>
            <p className='text-[1vw] pt-[0.8vw] pb-[4vw]'>Faça agora o nosso teste de personalidade e encontre o livro perfeito para o seu momento. Responda algumas perguntas e deixe que a magia da literatura te surpreenda.</p>
            <div className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center cursor-pointer'>FAZER TESTE</div>
          </div>
          <div className='w-[25vw] hidden sm:flex'>
            <Image src={book} alt='livro-representativo'/>
          </div>
        </div>
      </div>

      <div className='bg-[#EDEBE4] w-[100%] h-[15vw]'></div>

      <div className='flex items-center justify-center p-20' >

        <div className='pb-20  w-[74vw] border-t border-b border-[#E0E0E0] relative'>

          <div className='absolute bg-[#F3F2EC] px-[4vw] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <h3 className='text-[2.5vw]'>Livros Relevantes</h3>
          </div>

            <ul className=' flex gap-10 text-[1vw] pt-[4vw] items-center justify-center '>
               <li className={`hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2 cursor-pointer ${ genero === "a" ? "text-[#74642F]" : "text-[#999999]"}`} onClick={()=>setGenero("a")}>Todos gêneros</li>
               <li className={`hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2 cursor-pointer ${ genero === "business" ? "text-[#74642F]" : "text-[#999999]"}`} onClick={()=>setGenero("business")}>Negócios</li>
               <li className={`hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2 cursor-pointer ${ genero === "technology" ? "text-[#74642F]" : "text-[#999999]"}`} onClick={()=>setGenero("technology")}>Tecnologia</li>
               <li className={`hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2 cursor-pointer ${ genero === "adventure" ? "text-[#74642F]" : "text-[#999999]"}`} onClick={()=>setGenero("adventure")}>Aventura</li>
               <li className={`hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2 cursor-pointer ${ genero === "romance" ? "text-[#74642F]" : "text-[#999999]"}`} onClick={()=>setGenero("romance")}>Romance</li>
               <li className={`hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2 cursor-pointer ${ genero === "fiction" ? "text-[#74642F]" : "text-[#999999]"}`} onClick={()=>setGenero("fiction")}>Ficção</li>
            </ul>
            
        

          <div >
            <CardBook 
            livros={livros}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
