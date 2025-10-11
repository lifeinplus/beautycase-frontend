import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
    mockChangeLanguage,
    mockT,
    mockUseTranslation,
} from '@/tests/mocks/translation'
import { LanguageSwitcher } from './LanguageSwitcher'

describe('LanguageSwitcher', () => {
    it('renders the language switcher button', () => {
        render(<LanguageSwitcher />)

        expect(
            screen.getByRole('button', {
                name: 'buttons.language.ariaLabel',
            })
        ).toBeInTheDocument()
    })

    it('switches to Russian when button is clicked', async () => {
        const user = userEvent.setup()

        render(<LanguageSwitcher />)

        await user.click(
            screen.getByRole('button', { name: 'buttons.language.ariaLabel' })
        )

        expect(mockChangeLanguage).toHaveBeenCalledWith('ru')
    })

    it('switches to English when button is clicked', async () => {
        const user = userEvent.setup()

        mockUseTranslation.mockReturnValue({
            i18n: {
                language: 'ru',
                changeLanguage: mockChangeLanguage,
            },
            t: mockT,
        })

        render(<LanguageSwitcher />)

        await user.click(
            screen.getByRole('button', { name: 'buttons.language.ariaLabel' })
        )

        expect(mockChangeLanguage).toHaveBeenCalledWith('en')
    })
})
