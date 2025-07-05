import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { mockChangeLanguage } from '../../../../tests/mocks/translation'
import { LanguageSelect } from '../LanguageSelect'

describe('LanguageSelect', () => {
    it('renders select with language options', () => {
        render(<LanguageSelect />)

        expect(screen.getByRole('combobox')).toBeInTheDocument()

        expect(
            screen.getByRole('option', { name: 'Русский' })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('option', { name: 'English' })
        ).toBeInTheDocument()
    })

    it('select value matches current language', () => {
        render(<LanguageSelect />)

        const select = screen.getByRole('combobox') as HTMLSelectElement
        expect(select.value).toBe('en')
    })

    it('calls changeLanguage when a new language is selected', async () => {
        const user = userEvent.setup()

        render(<LanguageSelect />)
        await user.selectOptions(screen.getByRole('combobox'), 'ru')

        expect(mockChangeLanguage).toHaveBeenCalledWith('ru')
    })
})
