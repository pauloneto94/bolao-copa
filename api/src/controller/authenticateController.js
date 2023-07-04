const jwt = require('jsonwebtoken')
const yup = require("yup")

const userService = require('../services/userService')
const authConfig = require('../config/auth')

const authenticateUser = async (req, res) => {
    const { body } = req

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(6)
    })

    if(!(await schema.isValid(body))){
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "One of the following keys is missing or is empty on request body: 'email', 'password'"
            }
        })
        return
    }

    try {

        const user = await userService.getUserByEmail(body.email)
        if(!user){
            res.status(400).send({
                status: "FAILED",
                data: {
                    error: "User not found"
                }
            })
            return
        }

        if(!(await user.checkPassword(body.password))){
            res.status(400).send({
                status: "FAILED",
                data: {
                    error: "Password does not match"
                }
            })
            return
        }

        const { id } = user
    
        res.send({
            status: "OK",
            data: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                id: id,
                token: jwt.sign({id}, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                })
            }
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
    
}

module.exports = {
    authenticateUser
}