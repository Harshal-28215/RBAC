import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToMongo from './db.js'
import register from './Routes/register.js'
import login from './Routes/login.js'
import blog from './Routes/blog.js'
import user from './Routes/user.js'
import cookieParser from 'cookie-parser'

dotenv.config();

connectToMongo();

const app = express()
const port = 5000

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json())

app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/blog', blog)
app.use('/api/user', user)

app.listen(port, () => {
  console.log(`CodeGeni app backend listening on port at http://localhost:${port}`)
})