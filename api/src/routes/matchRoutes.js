const express = require("express")
const matchController = require("../controller/matchController")
const { authMiddleware } = require("../middlewares/auth")
const { adminMiddleware } = require('../middlewares/admin')

const router = express.Router()

router.get("/", matchController.getAllMatches)

router.use(authMiddleware)
router.use(adminMiddleware)

router.patch("/:matchId", matchController.editMatch)

module.exports = router