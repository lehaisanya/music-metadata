import { AudioStore } from './AudioStore'
import { TracksStore } from './TracksStore'

export const audioStore = new AudioStore()
export const tracksStore = new TracksStore(audioStore)
