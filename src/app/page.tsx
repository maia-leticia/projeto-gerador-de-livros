'use client';
import Link from 'next/link';
import Image from 'next/image';
import Header from "@/components/Header";
import book from "@/../public/img/book.png"


export default function Home() {
  return (
    <main>
      <Header/>
      <div className='bg-[#F3F2EC] flex items-center justify-center'>
        
        <div className='flex items-center justify-center gap-15'>
          
          <div className='w-[25vw] '>
            <h2 className='text-[4vw]'>Lorem Ipsum</h2>
            <p className='text-[1vw] pt-[0.8vw] pb-[4vw]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro molestiae a id culpa corporis non eius, facere molestias vero cum. Cumque dicta voluptatem nesciunt doloremque veritatis explicabo eius quo numquam.</p>
            <div className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center'>Botao</div>
          </div>

          <div className='w-[25vw] hidden sm:flex'>
            <Image src={book} alt='livro-representativo'/>
            <div className=''></div>
          </div>
        
        </div>

      </div>
    </main>
  );
}
