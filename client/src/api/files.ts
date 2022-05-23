import { Buffer } from 'buffer'
import { FileData, FileMetaTags, ImageData } from 'types/core'
import { readAsArrayBuffer } from 'utils/fileReader'

export const filesAPI = {
    getFiles: async (): Promise<FileData[]> => {
        const response = await fetch('/api/files', {
            method: 'GET',
        })

        const data = await response.json()

        return data
    },

    updateMetadata: async (
        file: string,
        tags: Partial<FileMetaTags>
    ): Promise<void> => {
        await fetch('/api/files', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file,
                tags,
            }),
        })
    },

    updateImage: async (file: string, image: File): Promise<ImageData> => {
        const imageFile = await readAsArrayBuffer(image)

        const response = await fetch('/api/files/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file,
                mime: image.type,
                image: Buffer.from(imageFile),
            }),
        })

        const data = await response.json()

        return data
    },
}
