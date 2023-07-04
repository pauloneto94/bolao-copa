const yup = require("yup")
const { isAfter } = require('date-fns')

const betService = require('../services/betService')
const matchService = require('../services/matchService')

const getAllBets = async (req, res) => {
    try {
        const allBets = await betService.getAllBets(req.userId)
        res.send({
            status: "OK",
            data: allBets
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
    
}

const createBet = async (req, res) => {
    var body = null

    const schema = yup.object().shape({
        bets: yup.array().of(
            yup.object().shape({
                homeTeamScores: yup.number().min(0).required(),
                visitTeamScores: yup.number().min(0).required(),
                matchId: yup.string(),
            }).noUnknown(true)
        )
    })

    await schema.validate(req.body).then(values => body = values ).catch(() => 
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "One of the following keys is missing or is empty on request body: 'bets', 'homeTeamScores', 'visitTeamScores', 'matchId'"
            }
        })
    )

    try {
        const matches = (await matchService.getAllMatches({})).map(match => match.id.toString())
        const newMatches = body.bets.map(bet => bet.matchId)

        if(!newMatches.every(match => matches.includes(match))){
            res.status(400).send({
                status: "FAILED",
                data: {
                    error: "One or more matches does not exist"
                }
            })
            return
        }
        
        const date = new Date()
        const dateLimit = new Date('October 10, 2022 00:00:00')

        if(isAfter(date, dateLimit)){
            res.status(400).send({
                status: "FAILED",
                data: {
                    error: "Time`s Up! You can`t create more bets"
                }
            })
            return
        }

        const { bets } = body

        const newBets = await Promise.all(bets.map(async bet => {
            const betExists = await betService.getBetByParams(req.userId, bet.matchId)

            if(betExists){
                await betExists.update({
                    homeTeamScores: bet.homeTeamScores,
                    visitTeamScores: bet.visitTeamScores
                })
                return null
            }else{
                return await {
                    ...bet,
                    date: date,
                    userId: req.userId
                }
            }

        }))

        console.log(newBets.filter(bet => !!bet))

        const newBetsCreated = await betService.createBets(newBets.filter(bet => !!bet))

        res.status(201).send({
            status: "OK",
            data: newBetsCreated
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
    
}

module.exports = {
    getAllBets,
    createBet
}