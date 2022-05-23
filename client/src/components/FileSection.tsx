import React, {
    ChangeEventHandler,
    FC,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    Box,
    Button,
    Center,
    Flex,
    Image,
    Input,
    SimpleGrid,
    Spacer,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { filesStore } from 'stores'
import { FileData, FileMetaTags } from 'types/core'
import { imageToDataUrl } from 'utils/dataUrl'
import { readAsDataURL } from 'utils/fileReader'

interface FileSectionProps {
    file: FileData
}

export const FileSection: FC<FileSectionProps> = observer(({ file }) => {
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [album, setAlbum] = useState('')
    const [genre, setGenre] = useState('')
    const [year, setYear] = useState('')
    const [trackNumber, setTrackNumber] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [loadedDataUrl, setLoadedDataUrl] = useState('')
    const toast = useToast()

    const imageEmptyColor = useColorModeValue('gray.200', 'gray.600')

    const imageInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setTitle(file.tags.title || '')
        setArtist(file.tags.artist || '')
        setAlbum(file.tags.album || '')
        setGenre(file.tags.genre || '')
        setYear(file.tags.year || '')
        setTrackNumber(file.tags.trackNumber || '')
    }, [file])

    const dataUrl = file.tags.image ? imageToDataUrl(file.tags.image) : null

    const isTitleChanged = title !== (file.tags.title || '')
    const isArtistChanged = artist !== (file.tags.artist || '')
    const isAlbumChanged = album !== (file.tags.album || '')
    const isGenreChanged = genre !== (file.tags.genre || '')
    const isYearChanged = year !== (file.tags.year || '')
    const isTrackNumberChanged = trackNumber !== (file.tags.trackNumber || '')
    const isImageChanged = !!loadedDataUrl

    const isMetadataChanged =
        isTitleChanged ||
        isArtistChanged ||
        isAlbumChanged ||
        isGenreChanged ||
        isYearChanged ||
        isTrackNumberChanged

    const onSave = async () => {
        const tags: Partial<FileMetaTags> = {}

        if (isTitleChanged) {
            tags.title = title
        }

        if (isArtistChanged) {
            tags.artist = artist
        }

        if (isAlbumChanged) {
            tags.album = album
        }

        if (isGenreChanged) {
            tags.genre = genre
        }

        if (isYearChanged) {
            tags.year = year
        }

        if (isTrackNumberChanged) {
            tags.trackNumber = trackNumber
        }

        try {
            await filesStore.updateMetadata(file.name, tags)

            toast({
                title: 'Метадані оновлено успішно',
                status: 'success',
            })
        } catch (err) {
            toast({
                title: 'Метадані не було оновлено',
                description: 'Спробуйте пізніше',
                status: 'error',
            })
        }
    }

    const onImageClick = () => {
        imageInputRef.current?.click()
    }

    const onImageLoad: ChangeEventHandler<HTMLInputElement> = async (event) => {
        if (event.target.files) {
            const loadedImage = event.target.files[0]
            const dataUrl = await readAsDataURL(loadedImage)

            setImage(loadedImage)
            setLoadedDataUrl(dataUrl)
        }
    }

    const onImageSave = async () => {
        if (image) {
            try {
                await filesStore.updateImage(file.name, image)

                toast({
                    title: 'Картинку оновлено успішно',
                    status: 'success',
                })

                setLoadedDataUrl('')
                setImage(null)
            } catch (err) {
                toast({
                    title: 'Картинку не було оновлено',
                    description: 'Спробуйте пізніше',
                    status: 'error',
                })
            }
        }
    }

    return (
        <Box>
            <SimpleGrid
                templateColumns="min-content 1fr"
                gap="15px"
                marginBottom="15px"
            >
                <Box
                    width="200px"
                    height="200px"
                    bgColor={imageEmptyColor}
                    onClick={onImageClick}
                >
                    {dataUrl || loadedDataUrl ? (
                        <Image
                            src={loadedDataUrl || dataUrl || ''}
                            boxSize="200px"
                        />
                    ) : null}
                    <Input
                        ref={imageInputRef}
                        type="file"
                        hidden
                        onChange={onImageLoad}
                    />
                </Box>
                <Box>
                    <Box textAlign="center" marginBottom="10px">
                        {file.name}
                    </Box>

                    <SimpleGrid
                        templateColumns="min-content 1fr min-content 1fr"
                        marginBottom="10px"
                        gap="5px"
                    >
                        <Center
                            marginRight="5px"
                            color={isTitleChanged ? 'green.500' : 'current'}
                        >
                            Назва:
                        </Center>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <Center
                            marginRight="5px"
                            color={isArtistChanged ? 'green.500' : 'current'}
                        >
                            Виконавець:
                        </Center>
                        <Input
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                        />

                        <Center
                            marginRight="5px"
                            color={isAlbumChanged ? 'green.500' : 'current'}
                        >
                            Альбом:
                        </Center>
                        <Input
                            value={album}
                            onChange={(e) => setAlbum(e.target.value)}
                        />

                        <Center
                            marginRight="5px"
                            color={
                                isTrackNumberChanged ? 'green.500' : 'current'
                            }
                        >
                            Номер:
                        </Center>
                        <Input
                            value={trackNumber}
                            onChange={(e) => setTrackNumber(e.target.value)}
                        />

                        <Center
                            marginRight="5px"
                            color={isYearChanged ? 'green.500' : 'current'}
                        >
                            Рік:
                        </Center>
                        <Input
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />

                        <Center
                            marginRight="5px"
                            color={isGenreChanged ? 'green.500' : 'current'}
                        >
                            Жанр:
                        </Center>
                        <Input
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </SimpleGrid>
                </Box>
            </SimpleGrid>
            <Flex>
                <Button
                    colorScheme="blue"
                    isDisabled={!isImageChanged}
                    onClick={onImageSave}
                >
                    Оновити картинку
                </Button>
                <Spacer />
                <Button
                    colorScheme="blue"
                    isDisabled={!isMetadataChanged}
                    onClick={onSave}
                >
                    Зберегти дані
                </Button>
            </Flex>
        </Box>
    )
})
