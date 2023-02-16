import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Grid, Heading, useBreakpointValue } from '@chakra-ui/react'
import { ImageLoader } from './ImageLoader'
import { AditionalInfo } from './AditionalInfo'
import { MainInfo } from './MainInfo'
import { tracksStore } from 'stores'

export const EditArea = observer(() => {
    const isMobile = useBreakpointValue({ base: true, lg: false })

    if (tracksStore.isNoSelected) {
        return null
    }

    return (
        <Box padding="10px">
            <Box marginBottom="10px">
                <Heading as="h1" size="lg" textAlign="center">
                    {tracksStore.selectedTrack?.info.filename ||
                        'Вибрано декілька'}
                </Heading>
            </Box>
            {isMobile ? (
                <ImageLoader />
            ) : (
                <Grid templateColumns="auto 1fr" gap="20px">
                    <ImageLoader />
                    <AditionalInfo />
                </Grid>
            )}
            <Box marginBottom={isMobile ? '10px' : '0px'}>
                <MainInfo />
            </Box>
            {isMobile ? <AditionalInfo /> : null}
        </Box>
    )
})
