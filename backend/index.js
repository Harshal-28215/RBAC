import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToMongo from './db.js'
import register from './Routes/register.js'
import login from './Routes/login.js'

dotenv.config();

connectToMongo();

const app = express()
const port = 5000
app.use(cors());

app.use(express.json())

app.use('/api/register', register)
app.use('/api/login', login)

app.listen(port, () => {
  console.log(`CodeGeni app backend listening on port at http://localhost:${port}`)
})