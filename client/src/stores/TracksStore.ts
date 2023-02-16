import { makeAutoObservable } from 'mobx'
import { tracksAPI } from 'api/tracksAPI'
import { TrackUpdate, TrackData, TrackUpdateTarget } from 'types/core'
import { AudioStore } from './AudioStore'

export class TracksStore {
    public tracks: TrackData[] = []
    public selectedTrack: TrackData | null = null
    public playedTrack: TrackData | null = null
    private selectedCount: number = 0
    private audioStore: AudioStore
    public tracksUpdate: TrackUpdate = {
        filename: null,
        title: null,
        artist: null,
        album: null,
        year: null,
        trackNumber: null,
        genre: null,
        image: null,
    }

    public get isSelected(): boolean {
        return this.selectedCount === 1
    }

    public get isAllSelected(): boolean {
        return this.selectedCount === this.tracks.length
    }

    public get isNoSelected(): boolean {
        return this.selectedCount === 0
    }

    constructor(audioStore: AudioStore) {
        this.audioStore = audioStore
        makeAutoObservable(this)
    }

    public async loadTracks() {
        const data = await tracksAPI.getTracks()

        const tracks: TrackData[] = data.map((info) => {
            return {
                info,
                checked: false,
            }
        })

        this.setTracks(tracks)
    }

    public selectTrack(track: TrackData) {
        this.tracks.forEach((t) => {
            t.checked = false
        })
        track.checked = true
        this.selectedCount = 1
        this.selectedTrack = track
    }

    public checkTrack(track: TrackData) {
        if (track.checked) {
            track.checked = false
            this.selectedCount--
            if (this.isSelected) {
                const finded = this.tracks.find((track) => track.checked)!
                this.selectedTrack = finded
            } else {
                this.selectedTrack = null
            }
        } else {
            track.checked = true
            this.selectedCount++
            if (this.isSelected) {
                this.selectedTrack = track
            } else {
                this.selectedTrack = null
            }
        }
    }

    public selectAllTracks() {
        this.tracks.forEach((track) => {
            track.checked = true
        })
        this.selectedTrack = null
        this.selectedCount = this.tracks.length
    }

    public clearAllTracks() {
        this.tracks.forEach((track) => {
            track.checked = false
        })
        this.selectedTrack = null
        this.selectedCount = 0
    }

    public nextTrack() {
        const index = this.tracks.findIndex((track) => track.checked)
        this.selectedTrack!.checked = false
        this.selectedTrack = this.getNextTrack(index)
        this.selectedTrack.checked = true
    }

    public prevTrack() {
        const index = this.tracks.findIndex((track) => track.checked)
        this.selectedTrack!.checked = false
        this.selectedTrack = this.getPrevTrack(index)
        this.selectedTrack.checked = true
    }

    public updateTag<Tag extends TrackUpdateTarget>(
        tag: Tag,
        newValue: TrackUpdate[Tag]
    ) {
        this.tracksUpdate[tag] = newValue
    }

    public appendUpdate(update: Partial<TrackUpdate>) {
        this.tracksUpdate = { ...this.tracksUpdate, ...update }
    }

    public async saveTracks() {
        const files = this.tracks.filter((track) => track.checked)

        const filenames = files.map((track) => track.info.filename)
        const update = this.tracksUpdate

        await tracksAPI.updateTracks({
            files: filenames,
            update,
        })

        this.applyUpdate(files)
    }

    private applyUpdate(tracks: TrackData[]) {
        tracks.forEach((track) => {
            if (this.tracksUpdate.title === false) {
                track.info.title = undefined
            } else if (this.tracksUpdate.title) {
                track.info.title = this.tracksUpdate.title
            }
            if (this.tracksUpdate.artist === false) {
                track.info.artist = undefined
            } else if (this.tracksUpdate.artist) {
                track.info.artist = this.tracksUpdate.artist
            }
            if (this.tracksUpdate.album === false) {
                track.info.album = undefined
            } else if (this.tracksUpdate.album) {
                track.info.album = this.tracksUpdate.album
            }
            if (this.tracksUpdate.trackNumber === false) {
                track.info.trackNumber = undefined
            } else if (this.tracksUpdate.trackNumber) {
                track.info.trackNumber = this.tracksUpdate.trackNumber
            }
            if (this.tracksUpdate.year === false) {
                track.info.year = undefined
            } else if (this.tracksUpdate.year) {
                track.info.year = this.tracksUpdate.year
            }
            if (this.tracksUpdate.genre === false) {
                track.info.genre = undefined
            } else if (this.tracksUpdate.genre) {
                track.info.genre = this.tracksUpdate.genre
            }
            if (this.tracksUpdate.image === false) {
                track.info.cover = undefined
            } else if (this.tracksUpdate.image) {
                track.info.cover = this.tracksUpdate.image.cover
            }
        })

        this.appendUpdate({
            filename: null,
            title: null,
            artist: null,
            album: null,
            year: null,
            trackNumber: null,
            genre: null,
            image: null,
        })
    }

    public playTrack(track: TrackData) {
        this.playedTrack = track
    }

    public playNext() {
        if (this.playedTrack) {
            const index = this.tracks.findIndex(
                (track) => track === this.playedTrack
            )
            const nextTrack = this.getNextTrack(index)
            this.playedTrack = nextTrack
        }
    }

    public playPrev() {
        if (this.playedTrack) {
            const index = this.tracks.findIndex(
                (track) => track === this.playedTrack
            )

            const prevTrack = this.getPrevTrack(index)
            this.playedTrack = prevTrack
        }
    }

    private getNextTrack(index: number): TrackData {
        if (index === this.tracks.length - 1) {
            return this.tracks[0]
        } else {
            return this.tracks[index + 1]
        }
    }

    private getPrevTrack(index: number): TrackData {
        if (index === 0) {
            return this.tracks[this.tracks.length - 1]
        } else {
            return this.tracks[index - 1]
        }
    }

    private setTracks(tracks: TrackData[]) {
        this.tracks = tracks
        if (this.tracks.length > 0) {
            this.selectedTrack = this.tracks[0]
            this.playedTrack = this.selectedTrack
            this.selectedTrack.checked = true
            this.selectedCount = 1
        } else {
            this.selectedTrack = null
            this.selectedCount = 0
        }
    }
}
