import Frequency from "../models/frequencies.js"
import Lesson from "../models/lessons.js"

export const create = async (req, res) => {
    const {description, date, classId, frequency} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo descrição da aula obrigatório!")
        }

        else if (!date) {
            return res.status(400).send("Campo data da aula obrigatório!")
        }

        const lesson = await Lesson.findOne({where: {description: description, classId: classId}})

        if (lesson) {
            return res.status(400).send("Aula já registrada!")
        }
        
        const newLesson = await Lesson.create({description, date, classId})

        const lessonId = newLesson.id

        for (let index = 0; index < frequency.length; index++) {
            const studentId = frequency[index].studentId
            const presence = frequency[index].presence
            
            await Frequency.create({studentId, presence, lessonId, classId})
        }

        return res.status(201).send("Aula registrada com sucesso!")

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const findAll = async (req, res) => {
    const classId = req.params.classId

    try {
        const lessons = await Lesson.findAll({where: {classId: classId}})

        return res.status(200).send(lessons)
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const id = req.params.id
    const {description, date, classId, frequency} = req.body

    try {
        if (!description) {
            return res.status(400).send("Campo descrição da aula obrigatório!")
        }

        else if (!date) {
            return res.status(400).send("Campo data da aula obrigatório!")
        }

        const lesson = await Lesson.findOne({where: {description: description, classId: classId}})

        if (lesson && id != lesson.id) {
            return res.status(400).send("Aula já registrada!")
        }

        await Lesson.update({description, date}, {where: {id: id}})

        for (let index = 0; index < frequency.length; index++) {
            const studentId = frequency[index].studentId
            const presence = frequency[index].presence
            
            await Frequency.update({presence}, {where: {studentId: studentId, lessonId: id}})
        }

        return res.status(200).send("Aula atualizada com sucesso!")
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
