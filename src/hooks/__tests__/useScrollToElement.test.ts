import { act, renderHook } from '@testing-library/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useScrollToElement } from '../useScrollToElement'

describe('useScrollToElement', () => {
    const mockGetBoundingClientRect = vi.fn().mockReturnValue({
        top: 100,
        height: 50,
    })

    const mockLocation = {
        pathname: '/test-page',
        state: { scrollId: '123' },
    }

    const mockNavigate = vi.fn()

    const mockScrollTo = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        window.scrollTo = mockScrollTo
        ;(useLocation as any).mockReturnValue(mockLocation)
        ;(useNavigate as any).mockReturnValue(mockNavigate)
    })

    it('should return pathname, state, and scroll function', () => {
        const { result } = renderHook(() => useScrollToElement())

        expect(result.current.pathname).toBe('/test-page')
        expect(result.current.state).toEqual({ scrollId: '123' })
        expect(typeof result.current.scroll).toBe('function')
    })

    it('should not scroll when node is null', () => {
        const { result } = renderHook(() => useScrollToElement())

        act(() => {
            result.current.scroll(null)
        })

        expect(mockScrollTo).not.toHaveBeenCalled()
    })

    it('should scroll to the element when node is provided', () => {
        const { result } = renderHook(() => useScrollToElement())

        const mockElement = {
            getBoundingClientRect: mockGetBoundingClientRect,
        } as unknown as HTMLDivElement

        act(() => {
            result.current.scroll(mockElement)
        })

        expect(mockScrollTo).toHaveBeenCalledWith({
            top: 75, // 100 - 50/2 = 75
            behavior: 'instant',
        })
    })

    it('should navigate with replace=true after scrolling', async () => {
        const { result } = renderHook(() => useScrollToElement())

        const mockElement = {
            getBoundingClientRect: mockGetBoundingClientRect,
        } as unknown as HTMLDivElement

        vi.useFakeTimers()

        act(() => {
            result.current.scroll(mockElement)
            vi.runAllTimers()
        })

        expect(mockNavigate).toHaveBeenCalledWith('/test-page', {
            replace: true,
        })

        vi.useRealTimers()
    })

    it('should not navigate if scrolled is false', () => {
        renderHook(() => useScrollToElement())
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
