import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Grid, Heading } from '@chakra-ui/react'
import { tracksStore } from 'stores'
import { EditTagRow } from 'components/EditTagRow'

export const MainInfo = observer(() => {
    const title =
        tracksStore.tracksUpdate.title ||
        tracksStore.selectedTrack?.info.title ||
        ''
    // const filename =
    //     tracksStore.tracksUpdate.filename ||
    //     tracksStore.selectedTrack?.info.filename ||
    //     ''
    const artist =
        tracksStore.tracksUpdate.artist ||
        tracksStore.selectedTrack?.info.artist ||
        ''
    const album =
        tracksStore.tracksUpdate.album ||
        tracksStore.selectedTrack?.info.album ||
        ''

    return (
        <Box>
            <Heading as="h2" size="md" textAlign="center" marginBottom="10px">
                Основна
            </Heading>
            <Grid templateColumns="auto auto 1fr auto auto" gap="10px">
                {/* <EditTagRow
                    title="Назва файлу"
                    tag="filename"
                    value={filename}
                    statusValue={tracksStore.tracksUpdate.filename}
                    hideRemoveButton
                /> */}
                <EditTagRow
                    title="Назва треку"
                    tag="title"
                    value={title}
                    statusValue={tracksStore.tracksUpdate.title}
                />
                <EditTagRow
                    title="Виконавець"
                    tag="artist"
                    value={artist}
                    statusValue={tracksStore.tracksUpdate.artist}
                />
                <EditTagRow
                    title="Альбом"
                    tag="album"
                    value={album}
                    statusValue={tracksStore.tracksUpdate.album}
                />
            </Grid>
        </Box>
    )
})
