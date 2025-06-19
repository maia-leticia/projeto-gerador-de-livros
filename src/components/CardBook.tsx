import Image from "next/image";
import book from "@/../public/img/book.png";
interface Livro {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    pageCount?: number;
  };
}
interface CardBookProps {
  livros: Livro[];
}

export default function CardBook({livros}:CardBookProps){
    return(
        <div className='grid md:grid-cols-4 grid-cols-3 gap-4 w-fit mx-auto'>
            {livros.map((livro)=>{
                const info = livro.volumeInfo
                return(
                    <div key={livro.id} className='w-[17vw] h-[29vw] my-[3vw] '>
                        <div className='h-[23vw] bg-[#EFEEE8] flex items-center justify-center'>
                            <Image
                            className="w-[11.458vw] h-auto"
                              src={(info.imageLinks?.thumbnail) || book}
                              alt={info.title}
                              width={150}
                              height={200}
                            />
                        </div>
                        <div className='mt-[2.5vw] flex flex-col items-center justify-center text-center'>
                            <h4 className='text-[1.3vw] '>{info.title}</h4>
                            <p className='text-[1vw] text-[#888888] '>{info.authors?.join(", ")}</p>
                            <p className='text-[1.5vw] text-[#74642F]'>{info.pageCount} páginas</p>
                        </div>
                    </div>                
                )
            })}

            
        </div>
    )
}