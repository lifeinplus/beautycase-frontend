import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '../app/store'

export const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
)
