import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const NavBar = () => {

    const { data: session } = useSession()

    return(
        <nav className='sticky top-0 bg-pink-900 p-4 drop-shadow shadow-pink-900 flex justify-between items-center z-10'>
                <div className='flex items-center'>
                    <img src='/worldcup_logo.svg' alt='logo' width='30' className='mr-5'/>
                    <a href='/' className='inline-block p-3 text-rose-100 hover:text-rose-300'>Dashboard</a>
                    <a href='/ranking' className='inline-block p-3 text-rose-100 hover:text-rose-300'>Ranking</a>
                    <a href='/agenda' className='inline-block p-3 text-rose-100 hover:text-rose-300'>Agenda</a>
                    <a href='/bets' className='inline-block p-3 text-rose-100 hover:text-rose-300'>Meus palpites</a>
                    <a href='/about' className='inline-block p-3 text-rose-100 hover:text-rose-300'>Sobre</a>
                </div>
                <div>
                    <a
                        href='/login'
                        onClick={() =>session?.user ? signOut() : signIn()}
                        className='inline-block py-2 px-5 text-rose-900 bg-rose-100 rounded hover:bg-rose-200 transition ease-in duration-150'
                    >
                        {session?.user ? 'Sair' : 'Entrar'}
                    </a>
                </div>
        </nav>
    )

}

export default NavBar
