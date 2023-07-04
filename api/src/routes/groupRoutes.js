const express = require("express")
const groupController = require("../controller/groupController")

const router = express.Router()

router.get("/", groupController.getAllGroups)

router.get("/:groupId", groupController.getGroupById)

module.exports = router