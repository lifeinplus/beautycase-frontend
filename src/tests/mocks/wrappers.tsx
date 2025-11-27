import { render, renderHook, RenderOptions } from '@testing-library/react'
import type { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import type { AppStore, RootState } from '@/app/store/store'
import { setupStore } from '@/app/store/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: AppStore
}

export const renderHookWithProvider = <T,>(hook: () => T) => {
    const Wrapper = ({ children }: PropsWithChildren<{}>) => {
        return <Provider store={setupStore()}>{children}</Provider>
    }

    return renderHook(hook, { wrapper: Wrapper })
}

export const renderWithProviderAndRouter = (
    component: ReactNode,
    initialEntries?: string[]
) => {
    return render(
        <Provider store={setupStore()}>
            <MemoryRouter initialEntries={initialEntries}>
                {component}
            </MemoryRouter>
        </Provider>
    )
}

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren) {
        return <Provider store={store}>{children}</Provider>
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const renderWithRouter = (
    component: ReactNode,
    initialEntries?: string[]
) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
    )
}
