import React, { useEffect, useState } from 'react'
import { LoadingPage } from 'pages/LoadingPage'
import { MainPage } from 'pages/MainPage'
import { tracksStore } from 'stores'
import { useEvent } from 'hooks/useEvent'

export const PageLoader = () => {
    const [loading, setLoading] = useState<boolean>(true)

    const init = useEvent(async () => {
        await tracksStore.loadTracks()
        setLoading(false)
    })

    useEffect(() => {
        init()
    }, [init])

    if (loading) {
        return <LoadingPage />
    }

    return <MainPage />
}
