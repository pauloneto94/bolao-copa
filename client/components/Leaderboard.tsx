import React, { useEffect, useState } from 'react'
import useApi from '../hooks/useApi'

const Leaderboard = () => {

    const { bolaoApi } = useApi()

    const [leaderboard, setLeaderboard] = useState([])

    useEffect(()=>{
        bolaoApi.get('/api/users').then(response => setLeaderboard(response.data.data))
        .catch(err => console.error(err))
    },[])

    return(
       <div className='relative flex flex-col w-full shadow-lg p-10 row-span-2'>
            <span className='absolute top-3 left-3 text-xl'>Ranking</span>
            <table className='table-auto' cellPadding={10}>
                <thead>
                    <tr>
                        <th className='text-left'>Nome</th>
                        <th className='text-right'>Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map(user => (
                        <tr>
                            <td className='pl-3'>{user.name}</td>
                            <td className='text-right'>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
       </div>
    )

}

export default Leaderboard;
