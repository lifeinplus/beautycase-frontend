import { pdf } from '@react-pdf/renderer'
import { renderHook, act } from '@testing-library/react'
import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    beforeAll,
    afterAll,
} from 'vitest'

import { mockCategory1 } from '../../../categories/__mocks__/categoriesApi.ts'
import { mockMakeupBagPDFData } from '../../__mocks__/makeupBagsApi.ts'
import { usePDFExport } from '../usePDFExport'

vi.mock('@react-pdf/renderer', () => ({
    pdf: vi.fn(),
}))

vi.mock('../../components/MakeupBagPDF')

Object.defineProperty(global.URL, 'createObjectURL', {
    value: vi.fn(),
    writable: true,
})

Object.defineProperty(global.URL, 'revokeObjectURL', {
    value: vi.fn(),
    writable: true,
})

describe('usePDFExport', () => {
    const mockBlob = new Blob(['test pdf content'], { type: 'application/pdf' })

    const mockPdfFunction = vi.fn()
    const mockPdfInstance = {
        toBlob: vi.fn(),
    }

    const spyConsoleError = vi.spyOn(console, 'error')

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        mockPdfFunction.mockImplementation(() => mockPdfInstance)
        vi.mocked(pdf).mockImplementation(mockPdfFunction)
        mockPdfInstance.toBlob.mockResolvedValue(mockBlob)
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    describe('exportToPDF', () => {
        it('should successfully export PDF with valid data', async () => {
            const { result } = renderHook(() => usePDFExport())

            const exportResult =
                await result.current.exportToPDF(mockMakeupBagPDFData)

            expect(exportResult.success).toBe(true)
            expect(exportResult.error).toBeUndefined()

            expect(result.current.error).toBe(null)
            expect(result.current.isGenerating).toBe(false)
        })

        it('should handle error when stages and tools are empty', async () => {
            const { result } = renderHook(() => usePDFExport())

            await act(async () => {
                await result.current.exportToPDF({
                    category: mockCategory1,
                    stages: [],
                    tools: [],
                })
            })

            expect(result.current.error).toBe('toast.noExportData')
        })

        it('should handle non-Error exceptions', async () => {
            const { result } = renderHook(() => usePDFExport())

            mockPdfInstance.toBlob.mockRejectedValue('String error')

            await act(async () => {
                await result.current.exportToPDF(mockMakeupBagPDFData)
            })

            expect(result.current.error).toBe('toast.exportError')
        })
    })

    describe('clearError', () => {
        it('should clear the error state', async () => {
            const { result } = renderHook(() => usePDFExport())

            await act(async () => {
                await result.current.exportToPDF({})
            })

            expect(result.current.error).toBe('toast.noExportData')

            act(() => {
                result.current.clearError()
            })

            expect(result.current.error).toBe(null)
        })
    })
})
