export interface TrackData {
    filename: string
    title?: string
    artist?: string
    album?: string
    year?: string
    trackNumber?: string
    genre?: string
    cover?: string
}

export interface ImageData {
    mime: string
    data: number[]
}

// T - set value
// null   - ignore
// false  - remove value
export type FiledUpdate<T> = T | null | false

export interface TrackUpdate {
    filename: FiledUpdate<string>
    title: FiledUpdate<string>
    artist: FiledUpdate<string>
    album: FiledUpdate<string>
    year: FiledUpdate<string>
    trackNumber: FiledUpdate<string>
    genre: FiledUpdate<string>
    image: FiledUpdate<ImageData>
}

export type TrackUpdateTarget = keyof TrackUpdate
