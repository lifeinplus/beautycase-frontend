import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'

import MakeupBagPDF from '../components/MakeupBagPDF'
import type { MakeupBagData } from '../types'

interface ExportResult {
    success: boolean
    error?: string
}

interface UsePDFExportReturn {
    exportToPDF: (
        data: MakeupBagData,
        filename?: string
    ) => Promise<ExportResult>
    isGenerating: boolean
    error: string | null
    clearError: () => void
}

export const usePDFExport = (): UsePDFExportReturn => {
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const exportToPDF = async (
        data: MakeupBagData,
        filename: string = 'makeup-bag.pdf'
    ): Promise<ExportResult> => {
        try {
            setIsGenerating(true)
            setError(null)

            if (!data || (!data.stages?.length && !data.tools?.length)) {
                throw new Error('Нет данных для экспорта')
            }

            const blob = await pdf(<MakeupBagPDF data={data} />).toBlob()

            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = filename
            link.style.display = 'none'

            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            URL.revokeObjectURL(url)

            return { success: true }
        } catch (error) {
            console.error('PDF export error:', error)
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Ошибка при создании PDF'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setIsGenerating(false)
        }
    }

    const clearError = () => setError(null)

    return {
        exportToPDF,
        isGenerating,
        error,
        clearError,
    }
}
