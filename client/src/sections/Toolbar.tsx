import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Drawer,
    DrawerContent,
    DrawerOverlay,
    IconButton,
    Stack,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react'
import {
    CancelIcon,
    NextIcon,
    PrevIcon,
    ReloadIcon,
    SaveIcon,
    MenuIcon,
    SelectAllIcon,
    TrashIcon,
} from 'icons'
import { tracksStore } from 'stores'
import { LeftBlock } from './LeftBlock'

export const Toolbar = observer(() => {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { isOpen, onOpen, onClose } = useDisclosure()

    const colorScheme = tracksStore.isAllSelected
        ? 'green'
        : tracksStore.isNoSelected
        ? 'red'
        : 'blue'

    const onToggleSelection = () => {
        if (tracksStore.isAllSelected) {
            tracksStore.clearAllTracks()
        } else {
            tracksStore.selectAllTracks()
        }
    }

    const onPrev = () => tracksStore.prevTrack()

    const onNext = () => tracksStore.nextTrack()

    const onReload = () => tracksStore.loadTracks()

    const onSave = () => tracksStore.saveTracks()

    const onClear = () =>
        tracksStore.appendUpdate({
            filename: null,
            title: null,
            artist: null,
            album: null,
            trackNumber: null,
            genre: null,
            year: null,
        })

    const onRemove = () =>
        tracksStore.appendUpdate({
            title: false,
            artist: false,
            album: false,
            trackNumber: false,
            genre: false,
            year: false,
        })

    return (
        <Stack
            padding="7px 10px"
            bgColor="gray.300"
            borderBottom="1px solid black"
            direction="row"
            justifyContent="end"
        >
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <LeftBlock />
                </DrawerContent>
            </Drawer>
            <IconButton
                aria-label="Remove All"
                colorScheme="red"
                icon={<TrashIcon />}
                onClick={onRemove}
            />
            <IconButton
                aria-label="Clear All"
                colorScheme="green"
                icon={<CancelIcon />}
                onClick={onClear}
            />
            <IconButton
                aria-label="Save"
                colorScheme="green"
                icon={<SaveIcon />}
                onClick={onSave}
            />
            <IconButton
                aria-label="Reload"
                colorScheme="green"
                icon={<ReloadIcon />}
                onClick={onReload}
            />
            <IconButton
                aria-label="Prev"
                colorScheme="blue"
                icon={<PrevIcon />}
                disabled={!tracksStore.isSelected}
                onClick={onPrev}
            />
            <IconButton
                aria-label="Next"
                colorScheme="blue"
                icon={<NextIcon />}
                disabled={!tracksStore.isSelected}
                onClick={onNext}
            />
            <IconButton
                aria-label="Toggle selection"
                colorScheme={colorScheme}
                icon={<SelectAllIcon />}
                onClick={onToggleSelection}
            />
            {isMobile ? (
                <IconButton
                    aria-label="Toggle Left"
                    colorScheme="blue"
                    icon={<MenuIcon />}
                    onClick={onOpen}
                />
            ) : null}
        </Stack>
    )
})
