import * as express from 'express'
import * as dotenv from 'dotenv'
import { filesRoute } from './routes/files'

dotenv.config()

const PORT = process.env.PORT || 5000

export class App {
    private app: express.Express

    constructor() {
        this.app = express()
    }

    public async start() {
        try {
            await this.init()
            await this.routes()
            this.app.listen(PORT, () => {
                console.log(`Server starting on port ${PORT}`)
            })
        } catch (err) {}
    }

    private async init() {
        this.app.use(
            express.json({
                limit: 52428800,
            })
        )
    }

    private async routes() {
        this.app.use('/api/files/', filesRoute)
    }
}
