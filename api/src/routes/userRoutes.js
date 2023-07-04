const express = require("express")
const userController = require("../controller/userController")
const { authMiddleware } = require("../middlewares/auth")

const router = express.Router()

router.get("/", userController.getAllUsers)

router.get("/:userId", userController.getUserById)

router.post("/", userController.createUser)

router.use(authMiddleware)

router.patch("/:userId", userController.editUser)

router.delete("/:userId", userController.deleteUser)

module.exports = router