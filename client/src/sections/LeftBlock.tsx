import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box } from '@chakra-ui/react'
import { TrackItem } from 'components/TrackItem'
import { tracksStore } from 'stores'

export const LeftBlock = observer(() => {
    return (
        <Box bgColor="gray.300" borderLeft="1px solid black">
            {tracksStore.tracks.map((track) => {
                return <TrackItem key={track.info.filename} track={track} />
            })}
        </Box>
    )
})
