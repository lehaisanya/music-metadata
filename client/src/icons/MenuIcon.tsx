import React, { FC } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export const MenuIcon: FC<IconProps> = (props) => {
    return (
        <Icon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            boxSize="20px"
            {...props}
        >
            <rect y="11" width="24" height="2" rx="1" />
            <rect y="4" width="24" height="2" rx="1" />
            <rect y="18" width="24" height="2" rx="1" />
        </Icon>
    )
}
