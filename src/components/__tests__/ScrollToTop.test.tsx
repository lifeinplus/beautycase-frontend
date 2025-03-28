import { render } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mockLocation, mockScrollTo } from '../../tests'
import { ScrollToTop } from '../ScrollToTop'

describe('ScrollToTop', () => {
    beforeEach(() => {
        vi.mocked(useLocation).mockReturnValue(mockLocation)
    })

    it('should scroll to top when pathname changes and no scrollId is present', () => {
        const withoutState = { ...mockLocation, state: undefined }

        vi.mocked(useLocation).mockReturnValue(withoutState)

        render(
            <MemoryRouter>
                <ScrollToTop />
            </MemoryRouter>
        )

        expect(mockScrollTo).toHaveBeenCalledTimes(1)
        expect(mockScrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        })
    })

    it('should not scroll to top when scrollId is present in state', () => {
        render(
            <MemoryRouter>
                <ScrollToTop />
            </MemoryRouter>
        )

        expect(mockScrollTo).not.toHaveBeenCalled()
    })

    it('renders nothing to the DOM', () => {
        const { container } = render(
            <MemoryRouter>
                <ScrollToTop />
            </MemoryRouter>
        )

        expect(container.firstChild).toBeNull()
    })
})
