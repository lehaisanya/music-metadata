import { makeAutoObservable } from 'mobx'

export class AudioStore {
    private audio: HTMLAudioElement = null!

    constructor() {
        makeAutoObservable(this)
    }

    public subscribe(audio: HTMLAudioElement) {
        this.audio = audio
        this.audio.play()
    }

    public play() {
        this.audio?.play()
    }

    public unsubscribe() {}
}
