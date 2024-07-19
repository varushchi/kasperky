import express from "express"
const app = express()
import cors from 'cors'
import {data} from './data.js'
const PORT = 5000

app.use(cors())

app.get('/data', (req, res) => {
    res.json(data)
})

app.listen(PORT, ()=> console.log(`Server listening on Port ${PORT}`))