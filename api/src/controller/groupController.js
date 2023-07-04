const groupService = require("../services/groupService")

const getAllGroups = async (req, res) => {
    try {
        const allgroups = await groupService.getAllGroups()
        
        res.send({
            status: "OK",
            data: allgroups
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
    
}

const getGroupById = async (req, res) => {
    const { params: { groupId } } = req

    if(!groupId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Paramenter :groupId cannot be empty"
            }
        })
        return
    }

    try {
        const group = await groupService.getGroupById(groupId)

        res.send({
            status: "OK",
            data: group
        })

    } catch (error) {
        res.status(error.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        })
    }
}

module.exports = {
    getAllGroups,
    getGroupById,
}