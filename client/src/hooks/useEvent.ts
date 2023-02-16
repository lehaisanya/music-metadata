import { useRef, useLayoutEffect, useCallback } from 'react'

export function useEvent<
    Args extends [],
    Result,
    Handler extends (...args: Args) => Result
>(handler: Handler): Handler {
    const handlerRef = useRef<Handler | null>(null)

    useLayoutEffect(() => {
        handlerRef.current = handler
    })

    const callback = useCallback((...args: Args) => {
        const handle = handlerRef.current as Handler

        return handle(...args)
    }, [])

    return callback as Handler
}
