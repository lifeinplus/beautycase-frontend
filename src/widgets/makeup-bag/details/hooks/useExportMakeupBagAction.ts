import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

import { useGetMakeupBagByIdQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { usePDFExport } from '@/features/makeup-bags/hooks/pdf/usePDFExport'
import { generatePdfFilename } from '@/features/makeup-bags/utils/pdf/generatePdfFilename'
import { Spinner } from '@/shared/components/ui/button-submit/ui/Spinner'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useExportMakeupBagAction = () => {
    const { pathname } = useLocation()
    const { id } = useParams()
    const { t } = useTranslation(['makeupBag', 'navigation'])

    const [isExporting, setIsExporting] = useState(false)

    const { exportToPDF, error: exportError, clearError } = usePDFExport()

    const isMakeupBagDetailsPage = pathname.match(
        new RegExp(
            `^(${ROUTES.backstage.makeupBags.root}|${ROUTES.makeupBags.root})/[a-f0-9]{24}$`
        )
    )

    const { data } = useGetMakeupBagByIdQuery(id!, {
        skip: !id || !isMakeupBagDetailsPage,
    })

    const categoryName = t(`categories.${data?.category?.name}.full`)

    useEffect(() => {
        if (exportError && isMakeupBagDetailsPage) {
            toast.error(exportError)
            clearError()
            setIsExporting(false)
        }
    }, [exportError, clearError, isMakeupBagDetailsPage])

    const handleExportToPDF = async () => {
        if (!data) {
            toast.error(t('toast.noExportData'))
            return
        }

        if (isExporting) return

        setIsExporting(true)

        try {
            const clientName = data?.client?.username || ''
            const filename = generatePdfFilename(categoryName, clientName)

            await exportToPDF(
                {
                    category: data.category,
                    stages: data.stages,
                    tools: data.tools,
                },
                filename
            )

            toast.success(t('toast.exportSuccess'))
        } catch (error) {
            console.error('Export failed:', error)
            toast.error(getErrorMessage(error))
        } finally {
            setIsExporting(false)
        }
    }

    if (!id || !isMakeupBagDetailsPage) return null

    return {
        key: 'export',
        auth: true,
        className: isExporting ? 'opacity-50 cursor-not-allowed' : '',
        icon: isExporting ? Spinner : DocumentArrowDownIcon,
        label: isExporting
            ? t('navigation:actions.exporting')
            : t('navigation:actions.export'),
        onClick: isExporting ? () => {} : handleExportToPDF,
    }
}
