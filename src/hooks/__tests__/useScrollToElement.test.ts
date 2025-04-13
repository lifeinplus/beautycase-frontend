import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockScrollTo } from '../../tests/mocks'
import { mockNavigate } from '../../tests/mocks/router'
import { useScrollToElement } from '../useScrollToElement'

describe('useScrollToElement', () => {
    const mockGetBoundingClientRect = vi.fn().mockReturnValue({
        top: 100,
        height: 50,
    })

    it('should return pathname, state, and scroll function', () => {
        const { result } = renderHook(() => useScrollToElement())

        expect(result.current.pathname).toBe('/test-pathname')
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

        expect(mockNavigate).toHaveBeenCalledWith('/test-pathname', {
            replace: true,
        })

        vi.useRealTimers()
    })

    it('should not navigate if scrolled is false', () => {
        renderHook(() => useScrollToElement())
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
