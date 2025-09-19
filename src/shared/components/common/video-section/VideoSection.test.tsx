import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { VideoSection } from './VideoSection'

vi.mock('@/shared/components/ui/image/Image')

describe('VideoSection', () => {
    it('renders app name and motto', () => {
        render(<VideoSection />)
        expect(screen.getByTestId('mocked-image')).toBeInTheDocument()
    })
})
