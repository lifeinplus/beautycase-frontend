import { act, renderHook } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { ROUTES } from '@/shared/config/routes'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useToHomeAction } from './useToHomeAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/hooks/pdf/usePDFExport')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/features/products/utils/pdf/generatePdfFilename')
vi.mock('@/shared/components/common/spinner-button/SpinnerButton')

describe('useToHomeAction', () => {
    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
    })

    it('handles back action', async () => {
        const { result } = renderHook(() => useToHomeAction())

        const backAction = result.current

        expect(backAction).toBeDefined()

        await act(async () => {
            await backAction!.onClick()
        })

        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.home, {
            replace: true,
            state: { scrollId: '123' },
        })
    })
})
