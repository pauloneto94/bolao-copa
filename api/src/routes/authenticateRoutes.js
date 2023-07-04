const express = require("express")
const authenticateController = require("../controller/authenticateController")

const router = express.Router()

router.post("/", authenticateController.authenticateUser)

module.exports = router