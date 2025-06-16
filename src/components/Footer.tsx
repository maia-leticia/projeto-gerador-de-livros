import Image from 'next/image';
import instagram from '@/../public/img/instagram.png'
import facebook from '@/../public/img/facebook.png'
import linkedin from '@/../public/img/linkedin.png'
import twitter from '@/../public/img/twitter.png'

export default function Footer(){
    return(
        <footer>
            <div className='flex gap-[13vw] px-[19vw] py-[3vw] items-baseline'>
                <h1><span className='font-bold text-[3vw]'>BOOK</span>saw</h1>
                <div className='flex gap-[2vw]'>
                    <div>
                        <h4 className='text-[1.5vw] mb-[1.2vw]'>Sobre Nós</h4>
                        <ul className='leading-[2vw] text-[#777777] hover:cursor-pointer'>
                            <li className='text-[1vw]  '>Visão</li>
                            <li className='text-[1vw]'>Artigos</li>
                            <li className='text-[1vw]'>Carreiras</li>
                            <li className='text-[1vw]'>Serviços</li>
                            <li className='text-[1vw]'>Doação</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='text-[1.5vw] mb-[1.2vw]'>Descubra</h4>
                        <ul className='leading-[2vw] text-[#777777] hover:cursor-pointer'>
                            <li className='text-[1vw]'>Home</li>
                            <li className='text-[1vw]'>Livros</li>
                            <li className='text-[1vw]'>Frases</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='text-[1.5vw] mb-[1.2vw]'>Minha Conta</h4>
                        <ul className='leading-[2vw] text-[#777777] hover:cursor-pointer'>
                            <li className='text-[1vw]'>Sing In</li>
                            <li className='text-[1vw]'>Ver Carrinho</li>
                            <li className='text-[1vw]'>Lista de Desejos</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className='text-[1.5vw] mb-[1.2vw]'>Ajuda</h4>
                        <ul className='leading-[2vw] text-[#777777] hover:cursor-pointer'>
                            <li className='text-[1vw]'>Central de ajuda</li>
                            <li className='text-[1vw]'>Reportar problema</li>
                            <li className='text-[1vw]'>Sugestões</li>
                            <li className='text-[1vw]'>Contate-nos</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='pt-[2.5vw] pb-[1.5vw] border-t border-[#E0E0E0] flex items-center justify-around'>
                <span className='text-[0.8vw] text-[#7A7A7A]'>© Leticia Maia. All rights reserved.</span>
                <div className='flex gap-10'>
                    <Image className='hover:cursor-pointer' src={instagram} alt='instagram'/>
                    <Image className='hover:cursor-pointer' src={facebook} alt='facebook'/>
                    <Image className='hover:cursor-pointer' src={linkedin} alt='linkedin'/>
                    <Image className='hover:cursor-pointer' src={twitter} alt='twitter'/>
                </div>
            </div>
        </footer>
    )
}