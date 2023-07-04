const yup = require("yup")

const userService = require("../services/userService")

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers()
        
        res.send({
            status: "OK",
            data: allUsers
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
    
}

const getUserById = async (req, res) => {
    const { params: { userId } } = req

    if(!userId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Paramenter :userId cannot be empty"
            }
        })
        return
    }

    try {
        const user = await userService.getUserById(userId)

        res.send({
            status: "OK",
            data: user
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
    
}

const createUser = async (req, res) => {
    const { body } = req

    const schema = yup.object().shape({
        name: yup.string().required().max(50),
        email: yup.string().email().required(),
        password: yup.string().required().min(6)
    })

    if(!(await schema.isValid(body))){
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "One of the following keys is missing or is empty on request body: 'name', 'email', 'password'"
            }
        })
        return
    }

    try {

        const userExists = await userService.getUserByEmail(body.email)
        if(userExists){
            res.status(400).send({
                status: "FAILED",
                data: {
                    error: "That email address is already in use"
                }
            })
            return
        }

        const newUser = await userService.createUser(body)
    
        res.status(201).send({
            status: "OK",
            data: newUser
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
    
}

const editUser = async (req, res) => {
    const { params: { userId } } = req
    let body = null

    const schema = yup.object().shape({
        name: yup.string().max(50),
        email: yup.string().email(),
        oldPassword: yup.string().min(6),
        password: yup.string()
            .min(6)
            .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
            ),
        confirmPassword: yup.string().when('password', (password, field) =>
            password ? field.required().oneOf([yup.ref('password')]) : field
        ),
    }).noUnknown(true)

    await schema.validate(req.body).then(values => body = values).catch((err) => {
    console.log(err)
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Body validation fails"
            }
        })
})

    if(!userId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Paramenter :userId cannot be empty"
            }
        })
        return
    }

    try {

        const user = await userService.getUserById(userId)

        if(body.email && body.email != user.email){
            console.log(body, user)
            const userExists = await userService.getUserByEmail(body.email)
            if(userExists){
                res.status(400).send({
                    status: "FAILED",
                    data: {
                        error: "That email address is already in use"
                    }
                })
                return
            }
        }

        if (body.oldPassword && !(await user.checkPassword(body.oldPassword))) {
            res.status(400).send({
                status: "FAILED",
                data: {
                    error: "Password does not match"
                }
            })
            return
        }

        const editedUser = await user.update(body)
    
        res.send({
            status: "OK",
            data: editedUser
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

const deleteUser = async (req, res) => {
    const { params: { userId } } = req

    if(!userId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Paramenter :userId cannot be empty"
            }
        })
        return
    }

    try {
        await userService.deleteUser(userId)

        res.status(204).send({
            status: "OK"
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    editUser,
    deleteUser
}