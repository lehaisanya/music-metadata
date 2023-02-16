import React, { FC, MouseEventHandler } from 'react'
import { Box, Center, Flex, IconButton, Image } from '@chakra-ui/react'
import { CheckIcon } from 'icons/CheckIcon'
import { TrackData } from 'types/core'
import { observer } from 'mobx-react-lite'
import { tracksStore } from 'stores'
import { PlayIcon } from 'icons/PlayIcon'

interface TrackItemProps {
    track: TrackData
}

export const TrackItem: FC<TrackItemProps> = observer(({ track }) => {
    const onClick = () => tracksStore.selectTrack(track)

    const onChecked: MouseEventHandler = (event) => {
        event.stopPropagation()
        tracksStore.checkTrack(track)
    }

    return (
        <Flex
            padding="10px"
            bgColor={track.checked ? 'gray.500' : 'transparent'}
            onClick={onClick}
        >
            <Box
                bgColor="gray.400"
                flexShrink="0"
                width="50px"
                height="50px"
                borderRadius="10px"
                overflow="hidden"
                marginRight="10px"
                onClick={onChecked}
            >
                {track.checked && !tracksStore.isSelected ? (
                    <Center
                        position="absolute"
                        width="50px"
                        height="50px"
                        borderRadius="10px"
                        bgColor="rgba(128, 128, 128, 0.5)"
                    >
                        <CheckIcon boxSize="32px" fill="gray.200" />
                    </Center>
                ) : null}
                {track.info.cover ? (
                    <Image boxSize="50px" fit="cover" src={track.info.cover} />
                ) : null}
            </Box>
            <Center flex="1">
                <Box>{track.info.filename}</Box>
            </Center>
            <Center>
                <IconButton
                    aria-label=""
                    colorScheme="blue"
                    variant={
                        tracksStore.playedTrack === track ? 'solid' : 'ghost'
                    }
                    icon={<PlayIcon />}
                    onClick={(event) => {
                        event.stopPropagation()
                        tracksStore.playTrack(track)
                    }}
                />
            </Center>
        </Flex>
    )
})
