import React from 'react'
import Link from 'next/link'

const Bets = ({todayBets}) => {

    return(
       <div className='flex flex-col relative shadow-lg p-16 w-full'>
            <span className='text-xl absolute top-3 left-3'>Palpites do dia</span>
           {todayBets?.map(match => (
                <div className='flex justify-between p-3'>
                    <p className='mr-10'>{match.time}</p>
                    <img src={`/flags/${match.homeFlag}.svg`} width='30' alt='flag' className='mx-5'/>
                    <p>{match.homeScore}</p>
                    <p className='mx-5'>x</p>
                    <p>{match.visitScore}</p>
                    <img src={`/flags/${match.visitFlag}.svg`} width='30' alt='flag' className='mx-5'/>
                </div>
           ))}
           <Link href='/bets'>
            <button className='absolute bottom-3 right-3'>Ver todos meus palpites -></button>
           </Link>
       </div>
    )

}

export default Bets;
