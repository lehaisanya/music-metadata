import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { MainPage } from 'pages/Main'

export const App = () => (
    <ChakraProvider theme={theme}>
        <MainPage />
    </ChakraProvider>
)
