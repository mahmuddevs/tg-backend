import express from "express"
import { Person } from "../model/Person.js"

const personRouter = express.Router()

personRouter.post("/create", async (req, res) => {
    console.log(req.body);
    const { name, email } = req.body

    const person = await Person.findOne({ email })

    if (person) {
        return res.send("User Exists")
    }

    const newPerson = {
        name,
        email
    }
    const user = await Person.create(newPerson)

    return res.send({ message: "User Created Successfully", user })

})

personRouter.post("/edit/:username", async (req, res) => {
    const { username } = req.params
    const { name, email } = req.body

    const person = await Person.findOne({ username }, { name, email })

    if (!person) {
        return res.send("No User Found")
    }

    const updatedPerson = await Person.findOneAndUpdate({ username }, { name, email })

    return res.send({ message: "User Updated Successfully" })
})


export default personRouter 