import React from 'react'
import Link from 'next/link'

const TodayMatches = ({todayMatches}) => {

    return(
       <div className='flex flex-col relative shadow-lg p-16 w-full'>
            <span className='text-xl absolute top-3 left-3'>Jogos do dia - {todayMatches && todayMatches[0]?.day}</span>
           {todayMatches?.map(match => (
                <div className='flex justify-between p-3'>
                    <p className='mr-10'>{match.time}</p>
                    <img src={`/flags/${match.homeFlag}.svg`} width='30' alt='flag' className='mx-5'/>
                    <p>{match.homeScore || 0}</p>
                    <p className='mx-5'>x</p>
                    <p>{match.visitScore || 0}</p>
                    <img src={`/flags/${match.visitFlag}.svg`} width='30' alt='flag' className='mx-5'/>
                </div>
           ))}
           <Link href='/agenda'>
            <button className='absolute bottom-3 right-3'>Agenda completa -></button>
           </Link>
       </div>
    )

}

export default TodayMatches
