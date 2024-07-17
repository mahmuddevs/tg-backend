import express from "express";
import { mongoDBUrl, port } from "./config/config.js"
import cors from 'cors'
import mongoose from "mongoose";
import personRouter from "./routes/personRoutes.js";
import { Person } from "./model/Person.js";
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/people', personRouter)

app.get('/:username', async (req, res) => {
    try {
        const { username } = req.params
        const person = await Person.findOne({ username })

        if (!person) {
            return res.send("No User Found")
        }
        return res.send(person)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})

mongoose
    .connect(mongoDBUrl)
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Running in port ${port}`);
        })

    })
    .catch((error) => {
        console.log(error);
    })