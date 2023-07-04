import React from 'react'
import Leaderboard from '../components/Leaderboard'
import withLayout from '../hooks/withLayout'
import withAuth from '../hooks/withAuth'

const Ranking = () => {

  return (
      <Leaderboard/>
  )
}

export default withAuth(withLayout(Ranking))
