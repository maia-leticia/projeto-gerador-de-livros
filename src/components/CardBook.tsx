import Image from 'next/image';

export default function CardBook(){
    return(
        <div className='w-[17vw] h-[29vw] py-[2.5vw]'>
            <div className='h-[23vw] bg-[#EFEEE8]'>
                <p className='w-[11.5vw]'>FOTO</p>
            </div>
            <div className='mt-[2.5vw] flex flex-col items-center justify-center'>
                <h4 className='text-[1.5vw]'>Titulo do livro</h4>
                <p className='text-[1vw] text-[#888888]'>Autor</p>
                <p className='text-[1.5vw] text-[#74642F]'>$ 45.00</p>
            </div>
        </div>
    )
}