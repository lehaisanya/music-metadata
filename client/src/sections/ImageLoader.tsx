import React, {
    useState,
    useRef,
    ChangeEventHandler,
    MouseEventHandler,
} from 'react'
import { observer } from 'mobx-react-lite'
import { Buffer } from 'buffer'
import {
    Box,
    Heading,
    Center,
    IconButton,
    Input,
    Image,
    Text,
    AspectRatio,
    Flex,
} from '@chakra-ui/react'
import { CancelIcon, CrossIcon, UploadIcon } from 'icons'
import { tracksStore } from 'stores'
import { readAsArrayBuffer, readAsDataURL } from 'utils/fileReader'

export const ImageLoader = observer(() => {
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [loadedDataUrl, setLoadedDataUrl] = useState<string | null>(null)

    const onImageLoad: ChangeEventHandler<HTMLInputElement> = async (event) => {
        if (event.target.files) {
            const loadedImage = event.target.files[0]
            const dataUrl = await readAsDataURL(loadedImage)
            const dataBuffer = await readAsArrayBuffer(loadedImage)

            setLoadedDataUrl(dataUrl)
            tracksStore.updateTag('image', {
                data: Array.from(Buffer.from(dataBuffer)),
                cover: dataUrl,
                mime: loadedImage.type,
            })
        }
    }

    const onImageClick = () => {
        imageInputRef.current!.click()
    }

    const onClearImage: MouseEventHandler = (event) => {
        event.stopPropagation()
        setLoadedDataUrl(null)
        tracksStore.updateTag('image', null)
    }

    return (
        <Box>
            <Heading as="h2" size="md" textAlign="center" marginBottom="10px">
                Обгортка
            </Heading>
            <Flex
                justifyContent="space-between"
                maxWidth="450px"
                margin="0px auto"
                gap="10px"
            >
                <AspectRatio flex="1" maxW="200px" ratio={1}>
                    <Box bgColor="gray.300" borderRadius="10px">
                        {tracksStore.selectedTrack?.info.cover ? (
                            <Image
                                width="100%"
                                height="100%"
                                fit="cover"
                                src={tracksStore.selectedTrack.info.cover}
                            />
                        ) : (
                            <Center>
                                <CancelIcon boxSize="40px" />
                            </Center>
                        )}
                    </Box>
                </AspectRatio>
                <AspectRatio
                    flex="1"
                    maxW="200px"
                    ratio={1}
                    onClick={onImageClick}
                >
                    <Box bgColor="gray.300" borderRadius="10px">
                        {loadedDataUrl ? (
                            <>
                                <Box position="absolute" top="0px" right="0px">
                                    <IconButton
                                        aria-label="Load image"
                                        colorScheme="red"
                                        size="sm"
                                        icon={<CrossIcon />}
                                        onClick={onClearImage}
                                    />
                                </Box>
                                <Image fit="cover" src={loadedDataUrl} />
                            </>
                        ) : (
                            <Center height="100%">
                                <UploadIcon boxSize="40px" />
                            </Center>
                        )}
                        <Input
                            ref={imageInputRef}
                            type="file"
                            hidden
                            onChange={onImageLoad}
                        />
                    </Box>
                </AspectRatio>
            </Flex>
            <Center marginBottom="10px">
                <Box width="200px" marginRight="50px">
                    <Text textAlign="center">Стара</Text>
                </Box>
                <Box width="200px">
                    <Text textAlign="center">Нова</Text>
                </Box>
            </Center>
        </Box>
    )
})
