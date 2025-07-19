import { vi } from 'vitest'

export const mockExportToPDF = vi.fn()

export const usePDFExport = vi.fn().mockReturnValue({
    exportToPDF: mockExportToPDF,
    isGenerating: false,
    error: null,
    clearError: vi.fn(),
})
