import User from "../models/users.js"

export const findOne = async (req, res) => {
    const {userId} = req.body

    const user = await User.findOne({where: {id: userId}})

    return res.status(200).send(user)
}

export const findAll = async (_, res) => {

    const users = await User.findAll()

    return res.status(200).send(users)
}

export const update = async (req, res) => {
    const {userId} = req.body
    const {name, email} = req.body

    if (!name) {
        return res.status(400).send("Campo nome obrigatório!")
    }

    else if (!email) {
        return res.status(400).send("Campo email obrigatório!")
    }

    await User.update({name: name, email: email}, {where: {id: userId}})

    return res.status(200).send("Usuário atualizado com sucesso!")
}

export const destroy = async (req, res) => {
    const {userId} = req.body

    await User.destroy({where: {id: userId}})

    return res.status(200).send("Conta excluida com sucesso!")
}
