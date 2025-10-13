import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ImageSection } from './ImageSection'

describe('ImageSection', () => {
    it('renders app name and motto', () => {
        render(<ImageSection />)
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
})
