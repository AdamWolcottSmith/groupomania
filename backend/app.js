const express = require('express')
const app = express()
const cors = require('cors')

const userRoutes = require('./routes/user')
const dashRoutes = require('./routes/dashboard')

//GLOBAL

app.use(cors())
app.use(express.json()) //req.body

//ROUTES

app.use('/auth', userRoutes)
app.use('/dashboard', dashRoutes)

module.exports = app