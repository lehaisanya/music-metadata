import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Center, IconButton, Text } from '@chakra-ui/react'
import { audioStore, tracksStore } from 'stores'
import { NextIcon, PrevIcon } from 'icons'

export const AudioControls = observer(() => {
    const [isPause, setIsPause] = useState<boolean>(true)
    const ref = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        audioStore.subscribe(ref.current!)

        return () => audioStore.unsubscribe()
    }, [])

    return (
        <Box>
            <Center bgColor="#474747" padding="5px" gap="10px">
                <IconButton
                    aria-label=""
                    icon={<PrevIcon />}
                    onClick={() => {
                        tracksStore.playPrev()
                    }}
                />
                <Text color="white" fontSize="20px">
                    {tracksStore.playedTrack?.info.filename}
                </Text>
                <IconButton
                    aria-label=""
                    icon={<NextIcon />}
                    onClick={() => {
                        tracksStore.playNext()
                    }}
                />
            </Center>
            <Box bgColor="white">
                <audio
                    ref={ref}
                    style={{ width: '100%' }}
                    controls
                    src={
                        tracksStore.selectedTrack
                            ? encodeURI(
                                  `/api/files/${tracksStore.playedTrack?.info.filename}`
                              )
                            : undefined
                    }
                    onEnded={() => {
                        setTimeout(() => {
                            tracksStore.playNext()
                        }, 300)
                    }}
                    onLoadedData={() => {
                        if (!isPause) {
                            audioStore.play()
                        }
                    }}
                    onPause={() => {
                        setIsPause(true)
                    }}
                    onPlay={() => {
                        setIsPause(false)
                    }}
                />
            </Box>
        </Box>
    )
})
