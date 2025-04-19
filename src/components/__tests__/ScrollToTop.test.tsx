import { useLocation } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mockScrollTo } from '../../tests/mocks'
import { mockLocation } from '../../tests/mocks/router'
import { renderWithRouter } from '../../tests/mocks/wrappers'
import { ScrollToTop } from '../ScrollToTop'

describe('ScrollToTop', () => {
    beforeEach(() => {
        vi.mocked(useLocation).mockReturnValue(mockLocation)
    })

    it('should scroll to top when pathname changes and no scrollId is present', () => {
        const withoutState = { ...mockLocation, state: undefined }

        vi.mocked(useLocation).mockReturnValue(withoutState)

        renderWithRouter(<ScrollToTop />)

        expect(mockScrollTo).toHaveBeenCalledTimes(1)
        expect(mockScrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        })
    })

    it('should not scroll to top when scrollId is present in state', () => {
        renderWithRouter(<ScrollToTop />)
        expect(mockScrollTo).not.toHaveBeenCalled()
    })

    it('renders nothing to the DOM', () => {
        const { container } = renderWithRouter(<ScrollToTop />)
        expect(container.firstChild).toBeNull()
    })
})
