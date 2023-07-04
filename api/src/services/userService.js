const Sequelize = require('sequelize')
const User = require("../models/User")

const getAllUsers = async () => {
    try {
        return await User.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COALESCE(SUM(COALESCE(points, 0)), 0)
                            FROM "bets" AS "Bet"
                            WHERE
                                "Bet"."userId" = "User"."id"
                        )`),
                        'points'
                    ]
                ]
            },
            order: [
                [Sequelize.literal('points'), 'DESC']
            ]
        })
    } catch (error) {
        throw error
    }
}

const getUserById = async (userId) => {
    try {
        return await User.findByPk(userId, {
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COALESCE(SUM(COALESCE(points, 0)), 0)
                            FROM "bets" AS "Bet"
                            WHERE
                                "Bet"."userId" = "User"."id"
                        )`),
                        'points'
                    ]
                ]
            }
        })
    } catch (error) {
        throw error
    }
}

const getUserByEmail = async (email) => {
    return await User.findOne({
        where: { email: email}
    })
}

const createUser = async (newUser) => {
    const userToInsert = {
        ...newUser,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        isAdmin: false
    }
    try{
        return await User.create(userToInsert)
    } catch(error){
        throw error
    }
    
}

const deleteUser = async (userId) => {
    try {
        return await User.destroy({
            where: {id: userId}
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    deleteUser
}