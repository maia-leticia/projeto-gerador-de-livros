import Link from 'next/link';
import Image from 'next/image';
import book from "@/../public/img/book.png";

type Props = {
    data: {
    livro: string | null;
    autor: string | null;
    descricao: string | null;
    message?: string;
  };
}

export default function Resultados({data}:Props){
    return(
        <main>
            <div className='flex items-center justify-center pb-10' id='home'>
                <div className='flex items-center justify-center gap-15'>
                <div className='w-[25vw] hidden sm:flex'>
                    <Image src={book} alt='livro-representativo'/>
                </div>
                <div className='w-[25vw]'>
                    <h2 className='text-[4vw]'>{data.livro}</h2>
                    <h2 className='text-[2vw]'>Por: {data.autor}</h2>
                    <p className='text-[1vw] pt-[0.8vw] pb-[4vw]'>{data.descricao}</p>
                    <Link href="/teste">
                    <div className='w-[10vw] border border-[#C0C0C0] text-[1vw] text-center cursor-pointer'>REFAZER TESTE</div>
                    </Link>
                </div>
                
                </div>
            </div>
        </main>
    )
}