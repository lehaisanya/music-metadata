import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Heading, Grid } from '@chakra-ui/react'
import { tracksStore } from 'stores'
import { EditTagRow } from 'components/EditTagRow'

export const AditionalInfo = observer(() => {
    const trackNumber =
        tracksStore.tracksUpdate.trackNumber ||
        tracksStore.selectedTrack?.info.trackNumber ||
        ''
    const year =
        tracksStore.tracksUpdate.year ||
        tracksStore.selectedTrack?.info.year ||
        ''
    const genre =
        tracksStore.tracksUpdate.genre ||
        tracksStore.selectedTrack?.info.genre ||
        ''

    return (
        <Box>
            <Heading as="h2" size="md" textAlign="center" marginBottom="10px">
                Додаткова
            </Heading>
            <Grid templateColumns="auto auto 1fr auto auto" gap="10px">
                <EditTagRow
                    title="Номер"
                    tag="trackNumber"
                    value={trackNumber}
                    statusValue={tracksStore.tracksUpdate.trackNumber}
                />
                <EditTagRow
                    title="Рік"
                    tag="year"
                    value={year}
                    statusValue={tracksStore.tracksUpdate.year}
                />
                <EditTagRow
                    title="Жанр"
                    tag="genre"
                    value={genre}
                    statusValue={tracksStore.tracksUpdate.genre}
                />
            </Grid>
        </Box>
    )
})
