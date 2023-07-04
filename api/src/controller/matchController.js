const yup = require("yup")

const matchService = require("../services/matchService")

const getAllMatches = async (req, res) => {
    const { day } = req.query

    try {
        const allMatches = await matchService.getAllMatches({ day })
        
        res.send({
            status: "OK",
            data: allMatches
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
    
}

const editMatch = async (req, res) => {
    const { body, params: { matchId } } = req

    const schema = yup.object().shape({
        homeTeamScores: yup.number(),
        awayTeamScores: yup.number()
    })

    if(!(await schema.isValid(body))){
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Body validation fails"
            }
        })
        return
    }

    if(!matchId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Paramenter :matchId cannot be empty"
            }
        })
        return
    }

    try {

        const match = await matchService.getMatchById(matchId)

        const editedmatch = await match.update(body)
    
        res.send({
            status: "OK",
            data: editedmatch
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

module.exports = {
    getAllMatches,
    editMatch,
}