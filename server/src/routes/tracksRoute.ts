import * as express from 'express'
import { metadataService } from '../services'

const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const tracks = await metadataService.readTags()

        res.json(tracks)
    } catch (err) {
        res.status(400).json(err)
    }
})

route.post('/', async (req, res) => {
    const { files, update } = req.body

    try {
        await metadataService.updateTags(files, update)

        res.status(200).end()
    } catch (err) {
        res.status(400).json(err)
    }
})

export const tracksRoute = route
