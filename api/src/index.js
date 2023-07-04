const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")
const userRoutes = require('./routes/userRoutes')
const matchRoutes = require('./routes/matchRoutes')
const groupRoutes = require('./routes/groupRoutes')
const authenticatenRoutes = require('./routes/authenticateRoutes')
const betRoutes = require('./routes/betRoutes')
const db = require('./database')
const { createGroups } = require("./utils/populate")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use("/api/users", userRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/groups", groupRoutes)
app.use("/api/authenticate", authenticatenRoutes)
app.use("/api/bets", betRoutes)

db.authenticate().then(() => console.log("Banco de dados conectado!")).catch(err => console.log(err))

db.sync({ alter: true }).then(() =>{
    createGroups()
    console.log("Tables created")
})

app.listen(PORT, () => {
    console.log(`API listen on port ${PORT}`)
})
