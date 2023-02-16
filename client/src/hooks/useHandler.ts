import { ChangeEventHandler } from 'react'

export function useHandler(
    handler: (newValue: string) => void
): ChangeEventHandler<HTMLInputElement> {
    const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        handler(event.target.value)
    }

    return changeHandler
}
