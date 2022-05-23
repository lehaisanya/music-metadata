import { Router } from 'express'
import * as fs from 'fs/promises'
import * as id3 from 'node-id3'
import { UpdateImageRequest } from '../types/reaquests'

const route = Router()

route.get('/', async (req, res) => {
    const files = await fs.readdir('./data')

    const filesMetadata = []

    for (let name of files) {
        const fileBuffer = await fs.readFile('./data/' + name)

        const tags = id3.read(fileBuffer)

        filesMetadata.push({
            name,
            tags,
        })
    }

    res.json(filesMetadata)
})

route.post('/', async (req, res) => {
    id3.update(req.body.tags, './data/' + req.body.file, () => {
        res.end('OK')
    })
})

route.post('/image', async (req, res) => {
    const file = req.body as UpdateImageRequest

    const tagsData = {
        imageBuffer: Buffer.from(file.image.data),
        type: {
            id: 3,
            name: 'front cover',
        },
        mime: file.mime,
        description: 'Cover',
    }

    id3.update(
        {
            image: tagsData,
        },
        './data/' + file.file,
        () => {
            res.json(tagsData)
        }
    )
})

export const filesRoute = route
