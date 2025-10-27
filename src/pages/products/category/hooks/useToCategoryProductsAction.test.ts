import { act, renderHook } from '@testing-library/react'
import { useLocation, useParams } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockProduct1 } from '@/features/products/api/__mocks__/productsApi'
import { useGetProductByIdQuery } from '@/features/products/api/productsApi'
import { ROUTES } from '@/shared/config/routes'
import { mockLocation, mockNavigate } from '@/tests/mocks/router'
import { useToCategoryProductsAction } from './useToCategoryProductsAction'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/form/slice/formSlice')
vi.mock('@/features/products/hooks/pdf/usePDFExport')
vi.mock('@/features/products/api/productsApi')
vi.mock('@/features/products/utils/pdf/generatePdfFilename')
vi.mock('@/shared/components/common/spinner-button/SpinnerButton')

describe('useToCategoryProductsAction', () => {
    vi.mocked(useLocation).mockReturnValue({
        ...mockLocation,
        pathname: ROUTES.backstage.products.details('123456789012345678901234'),
    })

    beforeEach(() => {
        vi.mocked(useGetProductByIdQuery as Mock).mockReturnValue({
            data: mockProduct1,
            isLoading: false,
            error: null,
        })
    })

    it('handles back action', async () => {
        const { result } = renderHook(() => useToCategoryProductsAction())

        const backAction = result.current

        expect(backAction).toBeDefined()

        await act(async () => {
            await backAction!.onClick()
        })

        expect(mockNavigate).toHaveBeenCalledWith(
            ROUTES.backstage.products.category(mockProduct1.category?.name!),
            {
                replace: true,
                state: { scrollId: '123' },
            }
        )
    })

    it('returns null if no id is provided', () => {
        vi.mocked(useParams).mockReturnValue({})
        const { result } = renderHook(() => useToCategoryProductsAction())
        expect(result.current).toEqual(null)
    })
})
