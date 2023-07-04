import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useApi from '../hooks/useApi'
import withLayout from '../hooks/withLayout'
import withAuth from '../hooks/withAuth'
import TodayMatches from '../components/TodayMatches'
import moment from 'moment'

const Agenda = () => {

  const { data: session } = useSession()

  const { bolaoApi } = useApi()
  
  const [matches, setMatches] = useState()

  console.log(matches && Object.keys(matches))

  useEffect(()=>{
    bolaoApi.get(`/api/matches`).then(response => {
      setMatches(
            response.data.data.map(match => ({
              homeFlag: match.home.name,
              homeScore: match.homeTeamScores,
              visitFlag: match.visit.name,
              visitScore: match.visitTeamScores,
              time: moment(match.startTime).format('HH:mm'),
              day: moment(match.startTime).format('DD/MM/YYYY')
            })).sort((a, b) => 
              moment(a.day, 'DD/MM/YYYY').diff(moment(b.day, 'DD/MM/YYYY'))
            ).reduce((day, item) => ({
              ...day,
              [item.day]: [...(day[item.day] || []), item].sort((a, b) => 
                moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm'))
              )
            }), {})
        )
    }).catch(err => console.error(err))
},[session])

  return (
    <div className='w-full'>
      {matches && Object.keys(matches).map(
      todayMatches => <TodayMatches todayMatches={matches[todayMatches]}/>
    )}
    </div>
    
  )
}

export default withAuth(withLayout(Agenda))
