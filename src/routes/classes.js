import { create, destroy, findAll, findOne, update } from "../controllers/classes.js"
import { Router } from "express"
import verifyToken from "../middlewares/auth.js"

const classRouter = Router()

classRouter.post("/", verifyToken, async (req, res) => {
    try {
        const userId = req.userId
        const description = req.body.description
        const numberOfLessons = req.body.numberOfLessons
        
        if (!description) {
            return res.status(400).send("Campo descrição obrigatório!")
        }
        
        else if (description.length < 3 || description.length > 30) {
            return res.status(400).send("Campo descrição deve conter entre 3 e 30 caracteres")
        }

        else if (!numberOfLessons) {
            return res.status(400).send("Campo número de aulas obrigatório!")
        }
        
        await create(description, numberOfLessons, userId)
        
        return res.status(201).send("Turma criada com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

classRouter.get("/", verifyToken, async (req, res) => {
    try {
        const userId = req.userId
        
        const classes = await findAll(userId)
        
        return res.status(200).send(classes)
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

classRouter.get("/:description", verifyToken, async (req, res) => {
    try {
        const description = req.params.description
        const userId = req.userId
        
        const myClass = await findOne(description, userId)
        
        return res.status(200).send(myClass)
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

classRouter.put("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.userId
        const description = req.body.description
        const numberOfLessons = req.body.numberOfLessons
        
        if (!description) {
            return res.status(400).send("Campo descrição obrigatório!")
        }
        
        else if (description.length < 3 || description.length > 30) {
            return res.status(400).send("Campo descrição deve conter entre 3 e 30 caracteres")
        }

        else if (!numberOfLessons) {
            return res.status(400).send("Campo número de aulas obrigatório!")
        }
        
        await update(id, description, numberOfLessons, userId)
        
        return res.status(200).send("Turma atualizada com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

classRouter.delete("/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        
        await destroy(id)
        
        return res.status(200).send("Turma excluida com sucesso!")
    }
    
    catch (err) {
        return res.status(400).send(err.message)
    }
})

export default classRouter
