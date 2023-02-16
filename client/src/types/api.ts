import { TrackUpdate } from './core'

export interface UpdateTracksRequest {
    files: string[]
    update: TrackUpdate
}
