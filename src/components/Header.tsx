'use client';
import Link from 'next/link';
import Image from 'next/image';
import menuVector from '@/../public/img/Vector.png'
import { useState } from 'react';

export default function Header(){
    return(
    <header className='bg-[#F3F2EC] '>
        <div className='flex justify-around items-center p-10 '>
            <h1><span className='font-bold text-[46px]'>BOOK</span>saw</h1>
            <ul className='hidden sm:flex gap-10 text-[16px] '>
                <li className='hover:text-[#74642F]'><Link href="#">Home</Link></li>
                <li className='hover:text-[#74642F]'><Link href="#">Em alta</Link></li>
                <li className='hover:text-[#74642F]'><Link href="#">Quote</Link></li>
                <li className='hover:text-[#74642F]'><Link href="#">Contato</Link></li>
            </ul>
            <div className='sm:hidden cursor-pointer'>
                <Image src={menuVector} alt='botao menu'/>
            </div>
        </div>
        <div >
            <ul className=' text-[16px] w-full'>
                <li className='hover:bg-[#74642F] hover:text-[#F3F2EC] p-5 border text-center'><Link href="#">Home</Link></li>
                <li className='hover:bg-[#74642F] hover:text-[#F3F2EC] p-5 border text-center'><Link href="#">Em alta</Link></li>
                <li className='hover:bg-[#74642F] hover:text-[#F3F2EC] p-5 border text-center'><Link href="#">Quote</Link></li>
                <li className='hover:bg-[#74642F] hover:text-[#F3F2EC] p-5 border text-center'><Link href="#">Contato</Link></li>
            </ul>
        </div>
    </header>
    )
   
}