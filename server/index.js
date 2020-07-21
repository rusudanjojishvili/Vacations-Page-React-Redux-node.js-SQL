const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const userRoutes = require('./userRoutes')
const vacationsRoutes = require('./vacationRoutes')

const app = express()

app.use (express.json())



app.use("/user", userRoutes)
app.use("/vacations", vacationsRoutes)


app.listen(1000, console.log("rocking1000"))

