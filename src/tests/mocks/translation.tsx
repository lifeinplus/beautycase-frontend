import { vi } from 'vitest'

export const mockT = vi.fn((key: string) => key)

const mockTranslation = () => {
    vi.mock('react-i18next', () => ({
        useTranslation: () => ({ t: mockT }),
    }))
}

export default mockTranslation
