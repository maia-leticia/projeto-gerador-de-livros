'use client';
import Link from 'next/link';
import Image from 'next/image';
import Header from "@/components/Header";
import book from "@/../public/img/book.png";
import CardBook from "@/components/CardBook";


export default function Home() {
  return (
    <main className='bg-[#F3F2EC] '>
      <Header/>

      <div className='flex items-center justify-center pb-10'>
        <div className='flex items-center justify-center gap-15'>
          <div className='w-[25vw]'>
            <h2 className='text-[4vw]'>Lorem Ipsum</h2>
            <p className='text-[1vw] pt-[0.8vw] pb-[4vw]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro molestiae a id culpa corporis non eius, facere molestias vero cum. Cumque dicta voluptatem nesciunt doloremque veritatis explicabo eius quo numquam.</p>
            <div className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center cursor-pointer'>Botao</div>
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
            <h3 className='text-[2.5vw]'>Popular Books</h3>
          </div>

            <ul className=' flex gap-10 text-[1vw] pt-[4vw] items-center justify-center text-[#999999]'>
               <li className='hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2'><Link  href="#">Todos gêneros</Link></li>
               <li className='hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2'><Link  href="#">Negócios</Link></li>
               <li className='hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2'><Link  href="#">Tecnologia</Link></li>
               <li className='hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2'><Link  href="#">Aventura</Link></li>
               <li className='hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2'><Link  href="#">Romance</Link></li>
               <li className='hover:underline hover:text-[black] decoration-[#74642F] underline-offset-8 decoration-2'><Link  href="#">Ficção</Link></li>
            </ul>
            
        

          <div>
            <CardBook />
          </div>

        </div>
      </div>
    </main>
  );
}
