import { TFunction } from 'i18next'
import { vi } from 'vitest'

export const mockT = vi.fn((key: string) => key) as unknown as TFunction

const mockTranslation = () => {
    vi.mock('react-i18next', () => ({
        useTranslation: () => ({ t: mockT }),
    }))
}

export default mockTranslation
