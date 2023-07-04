const Match = require("../models/Match")
const Bet = require("../models/Bet")
const Team = require("../models/Team")

const getAllBets = async (userId) => {
    try {
        return await Bet.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Match,
                    as: 'match',
                    attributes: ['id', 'startTime'],
                    include: [
                        {
                            model: Team,
                            as: 'home',
                            attributes: ['id', 'name', 'image']
                        },
                        {
                            model: Team,
                            as: 'visit',
                            attributes: ['id', 'name', 'image']
                        },
                    ]

                }
            ]
        })
    } catch (error) {
        throw error
    }
}

const getBetByParams = async (userId, matchId) => {
    try {
        return await Bet.findOne({
            where: { userId: userId, matchId: matchId }
        })
    } catch (error) {
        throw error
    }
}

const createBets = async (newBets) => {
    try {
        return await Bet.bulkCreate(newBets)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllBets,
    getBetByParams,
    createBets
}