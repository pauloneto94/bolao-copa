const Bet = require("../models/Bet")
const Match = require("../models/Match")
const Team = require("../models/Team")
const User = require("../models/User")
const { Op } = require('sequelize')

const getAllMatches = async (filterParams) => {
    try {
        let findParams = {
            attributes: [
                'id', 'startTime', 'homeTeamScores', 'visitTeamScores'
            ],
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
                {
                    model: Bet,
                    attributes: ['id', 'homeTeamScores', 'visitTeamScores', 'points'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        }
        if(filterParams.day) findParams = {...findParams, where: {
            startTime: {
                [Op.lt]: new Date(new Date(filterParams.day).getTime() + 60 * 60 * 24 * 1000 - 1),
                [Op.gt]: new Date(filterParams.day)
            }
        }}
        return await Match.findAll(findParams)
    } catch (error) {
        throw error
    }
}

const getMatchById = async (matchId) => {
    try {
        return await Match.findByPk(matchId,{
            attributes: [
                'id', 'startTime', 'homeTeamScores', 'visitTeamScores'
            ],
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
                {
                    model: Bet,
                    attributes: ['id', 'homeTeamScores', 'visitTeamScores', 'points'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMatches,
    getMatchById,
}