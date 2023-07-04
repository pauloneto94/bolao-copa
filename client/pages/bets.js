import React, { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import useApi from '../hooks/useApi'
import withLayout from '../hooks/withLayout'
import withAuth from '../hooks/withAuth'
import moment from 'moment'
import { useForm } from 'react-hook-form'

const Bets = () => {

  const { data: session } = useSession()

  const { bolaoApi } = useApi()
  
  const [matches, setMatches] = useState()
  const [bets, setBets] = useState()

  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(()=>{
      const defaultBets = bets?.reduce((o, bet) => ({ ...o, [bet.matchId]: {
        homeTeamScores: bet.homeTeamScores,
        visitTeamScores: bet.visitTeamScores
      }}), {})
      console.log(defaultBets)
      return {
        bets: defaultBets
      }
    }, [bets])
  })

  const onSubmit = (data) => {
    console.log(data)
    const bets = Object.keys(data.bets).map(matchId => {
      if(data.bets[matchId].homeTeamScores == "" || data.bets[matchId].visitTeamScores == "") return null   
      else return {
          matchId: matchId,
          homeTeamScores: parseInt(data.bets[matchId].homeTeamScores),
          visitTeamScores: parseInt(data.bets[matchId].visitTeamScores)
        }
      }).filter(bet => bet != null)
    bolaoApi.post('/api/bets', {bets: bets})
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }

  useEffect(()=>{
    bolaoApi.get(`/api/matches`).then(response => {
      setMatches(
            response.data.data.map(match => ({
              id: match.id,
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

    bolaoApi.get('/api/bets')
      .then(response => setBets(response.data.data))
      .catch(err => console.error(err))
  },[session])

  useEffect(()=>{
    const defaultBets = bets?.reduce((o, bet) => ({ ...o, [bet.matchId]: {
      homeTeamScores: bet.homeTeamScores,
      visitTeamScores: bet.visitTeamScores
    }}), {})
    reset({bets: defaultBets})
  },[bets])

  return (
    <div className='relative flex flex-col w-full shadow-lg p-10 row-span-2'>
      <span className='absolute top-3 left-3 text-xl'>Palpites</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='submit'>Salvar palpites</button>
        {matches && bets && Object.keys(matches).map(
          todayMatches => matches[todayMatches]?.map(match => {
            const matchId = `bets[${match.id}]`
            return (
              <div className='flex justify-between p-3' key={matchId}>
                <p className='mr-10'>{match.time}</p>
                <img src={`/flags/${match.homeFlag}.svg`} width='30' alt='flag' className='mx-5'/>
                <input {...register(`${matchId}.homeTeamScores`)}/>
                <p className='mx-5'>x</p>
                <input {...register(`${matchId}.visitTeamScores`)}/>
                <img src={`/flags/${match.visitFlag}.svg`} width='30' alt='flag' className='mx-5'/>
              </div>
            )
          })
        )}
      </form>
    </div>
  )
}

export default withAuth(withLayout(Bets))
