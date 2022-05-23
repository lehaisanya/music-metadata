import { Buffer } from 'buffer'
import { ImageData } from 'types/core'

export function imageToDataUrl(image: ImageData): string {
    const buffer = Buffer.from(image.imageBuffer.data)

    const encoded = buffer.toString('base64')

    return `data:${image.mime};base64,${encoded}`
}
