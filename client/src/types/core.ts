export interface ImageData {
    description: string
    imageBuffer: {
        type: 'Buffer'
        data: number[]
    }
    mime: string
    type: {
        id: number
        name: string
    }
}

export interface FileMetaTags {
    title: string
    artist: string
    encodingTechnology: string
    year: string
    album: string
    partOfSet: string
    trackNumber: string
    genre: string
    encodedBy: string
    bpm: string
    image: ImageData
}

export interface FileData {
    name: string
    tags: Partial<FileMetaTags>
}
