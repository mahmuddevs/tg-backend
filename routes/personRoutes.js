import express from "express"
import { Person } from "../model/Person.js"
import { upload } from "../config/multer.js";

const personRouter = express.Router()


personRouter.get("/all-users", async (req, res) => {
    try {
        const people = await Person.find({})
        return res.status(200).json({
            count: blogs.length,
            data: people
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})

personRouter.post("/create", upload.single("image"), async (req, res) => {
    try {
        const { name, email } = req.body
        const photo = req.file.path

        const person = await Person.findOne({ email })

        if (person) {
            return res.send("User Exists")
        }

        const newPerson = {
            name,
            email,
            photo
        }
        const user = await Person.create(newPerson)
        return res.send({ message: "User Created Successfully", user })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})

personRouter.put("/edit/:username", async (req, res) => {
    try {
        const { username } = req.params
        const { name, email } = req.body

        const person = await Person.findOne({ username }, { name, email })

        if (!person) {
            return res.send("No User Found")
        }

        const updatedPerson = await Person.findOneAndUpdate({ username }, { name, email })

        return res.send({ message: "User Updated Successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})

personRouter.delete("/:username", async (req, res) => {
    try {
        const { username } = req.params
        await Person.findOneAndDelete({ username })
        return res.send({ message: "User Deleted Successfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})

export default personRouter 