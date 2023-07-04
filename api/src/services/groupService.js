const Group = require("../models/Group")
const Match = require("../models/Match")
const Team = require("../models/Team")

const getAllGroups = async () => {
    try {
        return await Group.findAll({
            attributes: [
                'id', 'name'
            ],
            order: [['name', 'ASC']],
            include: [
                {
                    model: Team,
                    attributes: ['id', 'name', 'image']
                },
                {
                    model: Match,
                    attributes: ['id', 'startTime', 'homeTeamScores', 'visitTeamScores'],
                    order: [['starTime', 'ASC']],
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
                        }
                    ]
                }
            ]
        })
    } catch (error) {
        throw error
    }
}

const getGroupById = async (groupId) => {
    try {
        return await Group.findByPk(groupId,{
            attributes: [
                'id', 'name'
            ],
            include: [
                {
                    model: Team,
                    attributes: ['id', 'name', 'image']
                },
                {
                    model: Match,
                    attributes: ['id', 'startTime', 'homeTeamScores', 'visitTeamScores'],
                    order: [['starTime', 'ASC']],
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
    getAllGroups,
    getGroupById,
}