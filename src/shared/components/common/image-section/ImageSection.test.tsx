import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ImageSection } from './ImageSection'

vi.mock('@/shared/components/ui/image/Image')

describe('ImageSection', () => {
    it('renders app name and motto', () => {
        render(<ImageSection />)
        expect(screen.getByTestId('mocked-image')).toBeInTheDocument()
    })
})
