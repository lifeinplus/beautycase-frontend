import { render, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { TableRow, type TableRowProps } from '../../components/table/TableRow'

interface ProviderWrapperProps {
    children: ReactNode
}

const ProviderWrapper = ({ children }: ProviderWrapperProps) => {
    return <Provider store={store}>{children}</Provider>
}

export const renderHookWithProvider = <T,>(hook: () => T) => {
    return renderHook(hook, {
        wrapper: ProviderWrapper,
    })
}

export const renderWithProvider = (component: ReactNode) => {
    return render(<Provider store={store}>{component}</Provider>)
}

export const renderWithProviderAndRouter = (
    component: ReactNode,
    initialEntries?: string[]
) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                {component}
            </MemoryRouter>
        </Provider>
    )
}

export const renderWithRouter = (
    component: ReactNode,
    initialEntries?: string[]
) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
    )
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
