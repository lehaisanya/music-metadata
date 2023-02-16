import { UpdateTracksRequest } from 'types/api'
import { TrackInfo } from 'types/core'

export const tracksAPI = {
    async getTracks(): Promise<TrackInfo[]> {
        const response = await fetch('/api/tracks', {
            method: 'GET',
        })

        return await response.json()
    },

    async updateTracks(request: UpdateTracksRequest) {
        await fetch('/api/tracks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })
    },
}
