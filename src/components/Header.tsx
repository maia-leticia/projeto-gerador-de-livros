'use client';
import Link from 'next/link';
import Image from 'next/image';
import menuVector from '@/../public/img/Vector.png'
import { useState, useEffect } from 'react';

export default function Header(){
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(()=>{
        const handleResize=()=>{
            if(window.innerWidth>=640){
                setOpenMenu(false);
            }
        }
        window.addEventListener('resize',handleResize);
        return ()=> window.removeEventListener('resize',handleResize)
    },[])

    return(
        
    <header className='bg-[#F3F2EC] '>
        <div className='flex justify-around items-center p-10 '>
            <h1><span className='font-bold text-[3vw]'>BOOK</span>saw</h1>
            <ul className='hidden sm:flex gap-10 text-[1vw] '>
                <li className='hover:text-[#74642F]'><Link href="#">Home</Link></li>
                <li className='hover:text-[#74642F]'><Link href="#">Em alta</Link></li>
                <li className='hover:text-[#74642F]'><Link href="#">Quote</Link></li>
                <li className='hover:text-[#74642F]'><Link href="#">Contato</Link></li>
            </ul>
            <div className='sm:hidden cursor-pointer' onClick={()=>setOpenMenu(!openMenu)}>
                <Image src={menuVector} alt='botao menu'/>
            </div>
        </div>
        {openMenu && (
             <div className='sm:hidden'>
            <ul className=' text-[1vw] w-full'>
                <li className='hover:bg-[#74642F] hover:text-[#F3F2EC] p-[1vw] border text-center'><Link href="#">Home</Link></li>
                <li className='hover:bg-[#74642F] hover:text-[#F3F2EC] p-[1vw] border text-center'><Link href="#">Em alta</Link></li>
                <li className='hover:bg-[#74642F] hover:text-[#F3F2EC] p-[1vw] border text-center'><Link href="#">Quote</Link></li>
                <li className='hover:bg-[#74642F] hover:text-[#F3F2EC] p-[1vw] border text-center'><Link href="#">Contato</Link></li>
            </ul>
        </div>
        )}
    </header>
    )
}