const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const authConfig = require('../config/auth')

const authMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(400).send({
            status: "FAILED",
            data: {
                error: "Token not found"
            }
        })
    }
    
    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        req.userId = decoded.id
    } catch (error) {
        return res.status(400).send({
            status: "FAILED",
            data: {
                error: "Invalid token provided"
            }
        })
    }
    next()
}

module.exports = {
    authMiddleware
}