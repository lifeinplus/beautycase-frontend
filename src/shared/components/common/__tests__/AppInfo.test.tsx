import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '../../../../tests/mocks/wrappers'
import AppInfo from '../AppInfo'

describe('AppInfo', () => {
    it('renders app name and motto', () => {
        renderWithRouter(<AppInfo />)

        expect(screen.getByText(/Beautycase/i)).toBeInTheDocument()
        expect(screen.getByText(/home:motto/i)).toBeInTheDocument()
    })

    it('renders build version from package.json', () => {
        renderWithRouter(<AppInfo />)
        const buildRegex = /build \d{4}\.\d+\.\d+/
        expect(screen.getByText(buildRegex)).toBeInTheDocument()
    })
})
