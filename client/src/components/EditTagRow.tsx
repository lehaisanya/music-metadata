import React, { FC } from 'react'
import { Box, Flex, IconButton, Input, Text } from '@chakra-ui/react'
import { EditStatus } from './EditStatus'
import { useHandler } from 'hooks/useHandler'
import { tracksStore } from 'stores'
import { CrossIcon, TrashIcon } from 'icons'
import { TrackUpdateTarget } from 'types/core'

interface EditTagRowProps {
    title: string
    tag: TrackUpdateTarget
    value: string
    statusValue: string | null | false
    hideRemoveButton?: boolean
}

export const EditTagRow: FC<EditTagRowProps> = ({
    title,
    tag,
    value,
    statusValue,
    hideRemoveButton = false,
}) => {
    const onChange = useHandler((newValue) => {
        tracksStore.updateTag(tag, newValue)
    })

    const onClear = () => {
        tracksStore.updateTag(tag, null)
    }

    const onRemove = () => {
        tracksStore.updateTag(tag, false)
    }

    return (
        <>
            <EditStatus value={statusValue} />
            <Flex alignItems="center" justifyContent="end">
                <Text>{title}</Text>
            </Flex>
            <Input variant="filled" value={value} onChange={onChange} />
            <IconButton
                aria-label="Clear"
                icon={<CrossIcon />}
                onClick={onClear}
            />
            {hideRemoveButton ? (
                <Box />
            ) : (
                <IconButton
                    aria-label="Remove"
                    icon={<TrashIcon />}
                    onClick={onRemove}
                />
            )}
        </>
    )
}
