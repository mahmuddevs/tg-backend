import express from "express"
import { Person } from "../model/Person.js"
import { upload } from "../config/multer.js";

const personRouter = express.Router()


personRouter.get("/all-users", async (req, res) => {
    try {
        const people = await Person.find({})
        return res.status(200).json({
            count: people.length,
            data: people
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})


personRouter.get("/:username", async (req, res) => {
    try {
        const { username } = req.params

        const user = await Person.findOne({ username })

        return res.send(user)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})

personRouter.post("/add", upload.single("image"), async (req, res) => {
    try {
        const { name, designation, company, phone, ipPhone, email, companyUrl, address } = req.body
        const image = req.file.path

        const person = await Person.findOne({ email })

        if (person) {
            return res.send("User Exists")
        }

        const newPerson = {
            name,
            designation,
            company,
            phone,
            ipPhone,
            email,
            companyUrl,
            address,
            image
        }

        const user = await Person.create(newPerson)
        return res.send({ message: "User Created Successfully", username: user.username })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
})


personRouter.put("/edit/:username", upload.single("image"), async (req, res) => {
    try {
        const { username } = req.params
        const person = await Person.findOne({ username })

        if (!person) {
            return res.send("No User Found")
        }

        const { name, designation, company, phone, ipPhone, email, companyUrl, address } = req.body
        const image = req.file?.path

        const updatedPerson = {
            name,
            designation,
            company,
            phone,
            ipPhone,
            email,
            companyUrl,
            address,
            image
        }

        await Person.findOneAndUpdate({ username }, updatedPerson)

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