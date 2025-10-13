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

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '@/features/makeup-bags/api/makeupBagsApi'
import { usePDFExport } from '@/features/makeup-bags/hooks/pdf/usePDFExport'
import { generatePdfFilename } from '@/features/makeup-bags/utils/pdf/generatePdfFilename'
import { Spinner } from '@/shared/components/ui/button-submit/ui/Spinner'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useMakeupBagDetailsActions = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['makeupBag', 'modal'])

    const dispatch = useAppDispatch()
    const [isExporting, setIsExporting] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const { exportToPDF, error: exportError, clearError } = usePDFExport()

    const isMakeupBagDetailsPage = pathname.match(
        /^\/makeup-bags\/[a-f0-9]{24}$/i
    )

    const { data } = useGetMakeupBagByIdQuery(id!, {
        skip: !id || !isMakeupBagDetailsPage,
    })

    const [deleteMakeupBagById, { isLoading: isDeleting }] =
        useDeleteMakeupBagByIdMutation()

    const redirectPath = '/makeup-bags'
    const categoryName = t(`categories.${data?.category?.name}.full`)

    useEffect(() => {
        if (isMakeupBagDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isMakeupBagDetailsPage])

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

    const handleDelete = async () => {
        try {
            await deleteMakeupBagById(id!).unwrap()
            toast.success(t('modal:delete.toast', { name: categoryName }))
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id || !isMakeupBagDetailsPage) return []

    return [
        {
            key: 'back',
            auth: true,
            className: 'hidden sm:flex',
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
            icon: isExporting ? Spinner : DocumentArrowDownIcon,
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
            onClick: () => navigate(`/makeup-bags/${id}/edit`),
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
                onConfirm: isDeleting ? () => {} : handleDelete,
                onCancel: () => setIsModalDeleteOpen(false),
            },
        },
    ]
}
