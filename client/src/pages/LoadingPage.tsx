import React from 'react'
import { Center, Spinner } from '@chakra-ui/react'

export const LoadingPage = () => {
    return (
        <Center width="100vw" height="100vh">
            <Spinner
                thickness="10px"
                emptyColor="gray.300"
                color="blue.700"
                width="300px"
                height="300px"
            />
        </Center>
    )
}
