import React, { FC } from 'react'
import { Box, Flex, Image, Stack, useColorModeValue } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { filesStore } from 'stores'
import { imageToDataUrl } from 'utils/dataUrl'

interface TrackListProps {
    onClose: () => void
}

export const TrackList: FC<TrackListProps> = observer(({ onClose }) => {
    const hoverColor = useColorModeValue('gray.300', 'gray.500')
    const imageEmptyColor = useColorModeValue('gray.200', 'gray.600')

    return (
        <Stack direction="column">
            {filesStore.files.map((file, i) => {
                const dataUrl = file.tags.image
                    ? imageToDataUrl(file.tags.image)
                    : null

                return (
                    <Flex
                        key={i}
                        borderRadius="15px"
                        overflow="hidden"
                        transitionDuration="0.2s"
                        cursor="pointer"
                        _hover={{
                            backgroundColor: hoverColor,
                        }}
                        onClick={() => {
                            filesStore.setSelectedTrack(i)
                            onClose()
                        }}
                    >
                        <Box
                            bgColor={imageEmptyColor}
                            flexShrink="0"
                            width="50px"
                            height="50px"
                            marginRight="10px"
                            borderRadius="15px"
                            overflow="hidden"
                        >
                            {dataUrl ? (
                                <Image
                                    boxSize="50px"
                                    fit="cover"
                                    src={dataUrl}
                                />
                            ) : null}
                        </Box>
                        <Box flex="1" alignSelf="center" isTruncated>
                            {file.name}
                        </Box>
                    </Flex>
                )
            })}
        </Stack>
    )
})
