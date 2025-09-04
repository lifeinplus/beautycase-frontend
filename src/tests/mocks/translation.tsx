import { TFunction } from 'i18next'
import { vi } from 'vitest'

export const mockChangeLanguage = vi.fn()
export const mockT = vi.fn((key: string, options) => {
    if (options?.returnObjects) return []
    return key
}) as unknown as TFunction

export const mockUseTranslation = vi.fn(() => ({
    i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage,
    },
    t: mockT,
}))

const mockTranslation = () => {
    vi.mock('react-i18next', () => ({
        useTranslation: mockUseTranslation,
    }))
}

export default mockTranslation
