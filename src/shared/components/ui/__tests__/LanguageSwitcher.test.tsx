import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import {
    mockChangeLanguage,
    mockT,
    mockUseTranslation,
} from '../../../../tests/mocks/translation'
import { LanguageSwitcher } from '../LanguageSwitcher'

describe('LanguageSwitcher', () => {
    it('renders the language switcher button', () => {
        render(<LanguageSwitcher />)

        const button = screen.getByRole('button', {
            name: 'language.ariaLabel',
        })

        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('nav-btn')
    })

    it('switches to Russian when button is clicked', async () => {
        const user = userEvent.setup()

        render(<LanguageSwitcher />)

        await user.click(
            screen.getByRole('button', { name: 'language.ariaLabel' })
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
            screen.getByRole('button', { name: 'language.ariaLabel' })
        )

        expect(mockChangeLanguage).toHaveBeenCalledWith('en')
    })
})
