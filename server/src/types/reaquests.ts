export interface UpdateImageRequest {
    file: string
    mime: string
    image: {
        type: 'Buffer'
        data: number[]
    }
}
