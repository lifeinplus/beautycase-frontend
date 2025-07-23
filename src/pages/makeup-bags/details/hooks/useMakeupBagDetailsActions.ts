import {
    ArrowLeftIcon,
    DocumentArrowDownIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { usePDFExport } from '@/features/makeupBags/hooks/usePDFExport'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '@/features/makeupBags/makeupBagsApi'
import { generatePdfFilename } from '@/features/makeupBags/utils/generatePdfFilename'
import { SpinnerButton } from '@/shared/components/common/SpinnerButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const useMakeupBagDetailsActions = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation(['makeupBag', 'modal'])

    const dispatch = useAppDispatch()
    const [isExporting, setIsExporting] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const { exportToPDF, error: exportError, clearError } = usePDFExport()
    const [deleteMakeupBagById] = useDeleteMakeupBagByIdMutation()
    const { data } = useGetMakeupBagByIdQuery(id!, { skip: !id })

    const redirectPath = '/makeup-bags'
    const categoryName = t(`categories.${data?.category?.name}.full`)

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    useEffect(() => {
        if (exportError) {
            toast.error(exportError)
            clearError()
            setIsExporting(false)
        }
    }, [exportError, clearError])

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

    const handleDelete = async () => {
        try {
            await deleteMakeupBagById(id!).unwrap()
            toast.success(t('toast.delete'))
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id) return []

    return [
        {
            key: 'back',
            auth: true,
            className: navStyles.navBtnBack,
            icon: ArrowLeftIcon,
            label: t('navigation:actions.back'),
            onClick: () =>
                navigate(state?.fromPathname || redirectPath, {
                    replace: true,
                    state: { scrollId: id },
                }),
        },
        {
            key: 'export',
            auth: true,
            className: isExporting ? 'opacity-50 cursor-not-allowed' : '',
            icon: isExporting ? SpinnerButton : DocumentArrowDownIcon,
            label: isExporting
                ? t('navigation:actions.exporting')
                : t('navigation:actions.export'),
            onClick: isExporting ? () => {} : handleExportToPDF,
        },
        {
            key: 'edit',
            auth: true,
            icon: PencilSquareIcon,
            label: t('navigation:actions.edit'),
            roles: ['admin', 'mua'],
            onClick: () => navigate(`/makeup-bags/edit/${id}`),
        },
        {
            key: 'delete',
            auth: true,
            icon: TrashIcon,
            label: t('navigation:actions.delete'),
            roles: ['admin', 'mua'],
            onClick: () => setIsModalDeleteOpen(true),
            modalProps: {
                isOpen: isModalDeleteOpen,
                title: t('modal:delete.title'),
                description: t('modal:delete.description', {
                    name: categoryName,
                }),
                onConfirm: handleDelete,
                onCancel: () => setIsModalDeleteOpen(false),
            },
        },
    ]
}
