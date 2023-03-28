const Picture = require('../models/Picture')
const fs = require('fs')

exports.create = async (req, res) => {
    try {
        const { name } = req.body
        const file = req.file

        const picture = new Picture({
            name,
            src: file.path,
        })

        await picture.save()

        res.json({ picture, message: 'Imagem salva com sucesso!' })

    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar imagem.' })
    }
}

exports.findAll = async (req, res) => {
    try {
        const pictures = await Picture.find()

        res.json(pictures)

    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar imagem." })
    }
}

exports.remove = async (req, res) => {
    try {
        const picture = await Picture.findByIdAndDelete(req.params.id)

        if (!picture) { return res.status(404).json({ message: 'Imagem não encontrada!' }) }


            await picture.remove()
            fs.unlinkSync(picture.src)
            res.json({ message: 'Imagem excluida com sucesso!' })



    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir imagem.' })
    }
}