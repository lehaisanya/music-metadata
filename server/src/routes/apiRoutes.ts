import * as express from 'express'
import { tracksRoute } from './tracksRoute'

const route = express.Router()

route.use('/files', express.static('data'))

route.use('/tracks', tracksRoute)

export const apiRoute = route
