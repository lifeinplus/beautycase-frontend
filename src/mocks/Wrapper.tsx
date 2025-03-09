import { renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '../app/store'

interface WrapperProps {
    children: ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    return <Provider store={store}>{children}</Provider>
}

export const renderWithProvider = <T,>(hook: () => T) => {
    return renderHook(hook, {
        wrapper: Wrapper,
    })
}
