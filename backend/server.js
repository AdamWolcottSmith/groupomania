const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4000

//middleware

app.use(cors())
app.use(express.json()) //req.body

//ROUTES

//register and login routes

app.use('/auth', require('./routes/jwtAuth'))

app.get('/', (req, res) => {
 res.send('Hello, Chunklet')
})

app.listen(PORT, () => {
 console.log(`Sever running on port ${PORT}`);
})