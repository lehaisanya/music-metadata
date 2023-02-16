import React, { FC } from 'react'
import { Center } from '@chakra-ui/react'
import { CancelIcon, EditIcon, TrashIcon } from 'icons'

interface EditStatusProps {
    value: string | null | false
}

const StatusIcon: FC<EditStatusProps> = ({ value }) => {
    if (value === null) {
        return <CancelIcon fill="green" />
    } else if (value === false) {
        return <TrashIcon fill="red" />
    } else {
        return <EditIcon fill="blue" />
    }
}

export const EditStatus: FC<EditStatusProps> = ({ value }) => {
    return (
        <Center>
            <StatusIcon value={value} />
        </Center>
    )
}
