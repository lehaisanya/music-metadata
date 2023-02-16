import { Promise as id3, Tags } from 'node-id3'
import * as fs from 'fs/promises'
import { TrackData, TrackUpdate, TrackUpdateTarget } from '../types/core'

export class MetadataService {
    private musicFolder: string

    constructor(musicFolder: string) {
        this.musicFolder = musicFolder
    }

    public async readTags(): Promise<TrackData[]> {
        const files = await fs.readdir(`./${this.musicFolder}`)

        const promises = files.map((filename) => this.makeTrack(filename))

        return Promise.all(promises)
    }

    public async updateTags(files: string[], update: Partial<TrackUpdate>) {
        const promises = files.map(async (filename) => {
            return this.applyUpdate(filename, update)
        })

        await Promise.all(promises)
    }

    private async makeTrack(filename: string): Promise<TrackData> {
        const filepath = this.getFilepath(filename)
        const { title, artist, album, year, trackNumber, genre, image } =
            await id3.read(filepath)
        const cover = this.getCover(image)

        const track: TrackData = {
            filename,
            title,
            artist,
            album,
            year,
            trackNumber,
            genre,
        }

        if (cover) {
            track.cover = cover
        }

        return track
    }

    private getCover(image: Tags['image']): string | null {
        if (typeof image !== 'object') {
            return null
        }

        const encoded = image.imageBuffer.toString('base64')

        return `data:${image.mime};base64,${encoded}`
    }

    private async applyUpdate(filename: string, update: Partial<TrackUpdate>) {
        const filepath = this.getFilepath(filename)
        const oldTags = await id3.read(filepath, { noRaw: true })

        const tags: Tags = {}

        this.appendTag(tags, oldTags, 'title', update.title)
        this.appendTag(tags, oldTags, 'artist', update.artist)
        this.appendTag(tags, oldTags, 'album', update.album)
        this.appendTag(tags, oldTags, 'trackNumber', update.trackNumber)
        this.appendTag(tags, oldTags, 'year', update.year)
        this.appendTag(tags, oldTags, 'genre', update.genre)

        if (update.image === null) {
            tags.image = oldTags.image
        } else if (update.image !== false) {
            tags.image = {
                type: {
                    id: 3,
                    name: 'front cover',
                },
                description: 'Cover (Front)',
                mime: update.image.mime,
                imageBuffer: Buffer.from(update.image.data),
            }
        }

        await id3.write(tags, filepath)
    }

    private appendTag(
        tags: Tags,
        oldTags: Tags,
        key: keyof Omit<TrackUpdate, 'image' | 'filename'>,
        value: string | null | false
    ) {
        if (value === null) {
            tags[key] = oldTags[key]
        } else if (value !== false) {
            tags[key] = value
        }
    }

    private getFilepath(filename: string): string {
        return `./${this.musicFolder}/${filename}`
    }

    // deprecated
    private async updateImage(filename: string, image: any) {
        const imageBuffer = Buffer.from(image.data)
        const tags = {
            imageBuffer,
            type: {
                id: 3,
                name: 'front cover',
            },
            description: 'Cover (Front)',
            mime: image.mime,
        }

        const filepath = this.getFilepath(filename)
        await id3.update(
            {
                image: tags,
            },
            filepath
        )
    }
}
