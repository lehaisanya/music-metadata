import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { PageLoader } from 'pages/PageLoader'
import './styles.css'

export const App = () => (
    <ChakraProvider theme={theme}>
        <PageLoader />
    </ChakraProvider>
)
