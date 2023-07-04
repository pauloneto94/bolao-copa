const express = require("express")

const betController = require("../controller/betController")
const { authMiddleware } = require('../middlewares/auth')

const router = express.Router()

router.use(authMiddleware)

router.get("/", betController.getAllBets)

router.post("/", betController.createBet)

module.exports = router