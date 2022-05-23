import { makeAutoObservable } from 'mobx'
import { filesAPI } from 'api/files'
import { FileData, FileMetaTags, ImageData } from 'types/core'

export class FilesStore {
    public files: FileData[] = []
    public currentFile: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    public async init() {
        const data = await filesAPI.getFiles()

        this.setFiles(data)
    }

    public async updateMetadata(file: string, tags: Partial<FileMetaTags>) {
        await filesAPI.updateMetadata(file, tags)

        this.doneUpdateMetadata(file, tags)
    }

    public async updateImage(file: string, image: File) {
        const newImageData = await filesAPI.updateImage(file, image)

        this.doneUpdateImage(file, newImageData)
    }

    public nextTrack() {
        this.currentFile++
    }

    public prevTrack() {
        this.currentFile--
    }

    public setSelectedTrack(track: number) {
        this.currentFile = track
    }

    private doneUpdateImage(file: string, image: ImageData) {
        const findedFile = this.findFile(file)

        if (findedFile) {
            findedFile.tags = { ...findedFile.tags, image }
        }
    }

    private doneUpdateMetadata(file: string, tags: Partial<FileMetaTags>) {
        const findedFile = this.findFile(file)

        if (findedFile) {
            findedFile.tags = { ...findedFile.tags, ...tags }
        }
    }

    private findFile(file: string): FileData | undefined {
        return this.files.find((search) => search.name === file)
    }

    private setFiles(files: FileData[]) {
        this.files = files
        this.currentFile = 0
    }
}
