import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Bets from '../components/Bets'
import Leaderboard from '../components/Leaderboard'
import TodayMatches from '../components/TodayMatches'
import useApi from '../hooks/useApi'
import withLayout from '../hooks/withLayout'
import withAuth from '../hooks/withAuth'
import moment from 'moment'

const Home = () => {

  const { data: session } = useSession()

  const { bolaoApi } = useApi()
  
  const [todayMatches, setTodayMatches] = useState()
  const [todayBets, setTodayBets] = useState()

  const today = moment().format('YYYY-MM-DD')

  console.log(todayMatches)

  useEffect(()=>{
    bolaoApi.get(`/api/matches?day=${'2022-11-21'}`).then(response => {
        setTodayMatches(
            response.data.data.map(match => ({
              homeFlag: match.home.name,
              homeScore: match.homeTeamScores,
              visitFlag: match.visit.name,
              visitScore: match.visitTeamScores,
              time: moment(match.startTime).format('HH:mm'),
              day: moment(match.startTime).format('DD/MM/YYYY')
            })).sort((a, b) => 
              moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm'))
            )
        )
        console.log(response.data.data[3].Bets.find(bet => bet.user.id == session?.user.id)?.visitTeamScores)
        setTodayBets(
          response.data.data.map(match => ({
              homeFlag: match.home.name,
              homeScore: match.Bets
                .find(bet => bet.user.id == session?.user.id)
                ?.homeTeamScores != undefined ?
                  match.Bets
                  .find(bet => bet.user.id == session?.user.id)
                  ?.homeTeamScores :
                  '-',
              visitFlag: match.visit.name,
              visitScore: match.Bets
                .find(bet => bet.user.id == session?.user.id)
                ?.visitTeamScores != undefined ?
                  match.Bets
                    .find(bet => bet.user.id == session?.user.id)
                    ?.visitTeamScores :
                  '-',
              time: moment(match.startTime).format('HH:mm')
          })).sort((a, b) => 
            moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm'))
          )
        )
    }).catch(err => console.error(err))
},[session])

  return (
    <div className="flex flex-row w-full grid gap-3 grid-cols-2 grid-rows-2">
      <TodayMatches todayMatches={todayMatches}/>
      <Leaderboard/>
      <Bets todayBets={todayBets}/>
    </div>
  )
}

export default withAuth(withLayout(Home))
