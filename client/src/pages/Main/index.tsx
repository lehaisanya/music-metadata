import React, { useEffect } from 'react'
import {
    Box,
    Button,
    Center,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Spacer,
    useDisclosure,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { filesStore } from 'stores'
import { FileSection } from 'components/FileSection'
import { ColorModeSwitcher } from 'components/ColorModeSwitcher'
import { TrackList } from 'components/TrackList'

export const MainPage = observer(() => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const isNotEmpty = filesStore.files.length !== 0
    const isNotFirst = filesStore.currentFile !== 0
    const isNotLast = filesStore.currentFile !== filesStore.files.length - 1
    const currentFile = isNotEmpty
        ? filesStore.files[filesStore.currentFile]
        : null

    useEffect(() => {
        filesStore.init()
    }, [])

    return (
        <Box>
            <Center marginBottom="20px" paddingY="10px">
                <ColorModeSwitcher />
            </Center>
            <Container maxWidth="container.md">
                <Center width="container.md" position="absolute">
                    {isNotEmpty ? (
                        <Button colorScheme="blue" onClick={onOpen}>
                            Вибрати
                        </Button>
                    ) : null}
                </Center>

                <Drawer
                    placement="right"
                    size="sm"
                    blockScrollOnMount
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerBody>
                            <TrackList onClose={onClose} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                <Flex marginBottom="15px">
                    {isNotEmpty && isNotFirst ? (
                        <Button
                            colorScheme="blue"
                            onClick={() => filesStore.prevTrack()}
                        >
                            Попередній
                        </Button>
                    ) : null}
                    <Spacer />
                    {isNotEmpty && isNotLast ? (
                        <Button
                            colorScheme="blue"
                            onClick={() => filesStore.nextTrack()}
                        >
                            Наступний
                        </Button>
                    ) : null}
                </Flex>

                {currentFile ? <FileSection file={currentFile} /> : null}
            </Container>
        </Box>
    )
})
