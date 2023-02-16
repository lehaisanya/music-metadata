import React from 'react'
import { Box, Flex, Grid, useBreakpointValue } from '@chakra-ui/react'
import { LeftBlock } from '../sections/LeftBlock'
import { Toolbar } from '../sections/Toolbar'
import { EditArea } from '../sections/EditArea'
import { AudioControls } from '../sections/AudioControls'

export const MainPage = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false })

    if (isMobile) {
        return (
            <Flex width="100%" minHeight="100vh" direction="column">
                <Box position="sticky" top="0px" zIndex="1">
                    <Toolbar />
                </Box>
                <Box flex="1">
                    <EditArea />
                </Box>
                <Box position="sticky" bottom="0px" zIndex="1">
                    <AudioControls />
                </Box>
            </Flex>
        )
    }

    return (
        <Grid
            width="100vw"
            height="100vh"
            templateColumns="1fr minmax(350px, 400px)"
            templateRows="1fr"
        >
            <Box overflow="hidden">
                <Flex direction="column" height="100%">
                    <Toolbar />
                    <Box flex="1" overflow="auto">
                        <EditArea />
                    </Box>
                    <AudioControls />
                </Flex>
            </Box>
            <Box overflow="auto">
                <LeftBlock />
            </Box>
        </Grid>
    )
}
