import { vi } from 'vitest'

export const mockHooks = () => {
    vi.mock('../../hooks', () => ({
        useScrollToElement: () => ({
            pathname: '/current-page',
            state: { scrollId: '2' },
            scroll: vi.fn(),
        }),
    }))
}
