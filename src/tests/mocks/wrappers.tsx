import { render, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '../../app/store'
import { TableRow, type TableRowProps } from '../../components'

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

export const renderWithRouter = (component: ReactNode) => {
    return render(<MemoryRouter>{component}</MemoryRouter>)
}

export const renderTableRow = (props: TableRowProps) => {
    return render(
        <table>
            <tbody>
                <TableRow {...props} />
            </tbody>
        </table>
    )
}
