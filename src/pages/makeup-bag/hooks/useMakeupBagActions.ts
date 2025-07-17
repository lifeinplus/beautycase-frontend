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

const ACTIONS = {
    back: {
        icon: ArrowLeftIcon,
        label: 'actions.back',
    },
    export: {
        icon: DocumentArrowDownIcon,
        label: 'actions.export',
    },
    edit: {
        icon: PencilSquareIcon,
        label: 'actions.edit',
    },
    delete: {
        icon: TrashIcon,
        label: 'actions.delete',
    },
} as const

type ActionId = keyof typeof ACTIONS

interface ActionItem {
    id: ActionId
    auth?: boolean
    className?: string
    roles?: string[]
}

const ACTION_ITEMS: ActionItem[] = [
    { id: 'back', className: navStyles.navBtnBack },
    { id: 'export', auth: false },
    { id: 'edit', auth: true, roles: ['admin', 'mua'] },
    { id: 'delete', auth: true, roles: ['admin', 'mua'] },
]

export const useMakeupBagActions = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation(['makeupBag'])

    const dispatch = useAppDispatch()
    const [isExporting, setIsExporting] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const { exportToPDF, error: exportError, clearError } = usePDFExport()
    const [deleteMakeupBagById] = useDeleteMakeupBagByIdMutation()
    const { data } = useGetMakeupBagByIdQuery(id!, { skip: !id })

    const redirectPath = '/makeup_bags'

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
            const categoryName = t(`categories.${data?.category?.name}.full`)
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
        if (!id) return
        try {
            await deleteMakeupBagById(id).unwrap()
            toast.success(t('toast.delete'))
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    const actionHandlers = {
        back: () =>
            navigate(state?.fromPathname || redirectPath, {
                replace: true,
                state: { scrollId: id },
            }),
        export: handleExportToPDF,
        edit: () => navigate(`${redirectPath}/edit/${id}`),
        delete: () => setIsModalDeleteOpen(true),
    }

    const getActionIcon = (actionId: ActionId) => {
        return actionId === 'export' && isExporting
            ? SpinnerButton
            : ACTIONS[actionId].icon
    }

    const getActionLabel = (actionId: ActionId) => {
        if (actionId === 'export' && isExporting) {
            return t('navigation:actions.exporting')
        }
        return t(`navigation:${ACTIONS[actionId].label}`)
    }

    const isActionDisabled = (actionId: ActionId) => {
        return actionId === 'export' && isExporting
    }

    if (!id) return []

    return ACTION_ITEMS.map(({ id, className, ...rest }) => ({
        key: id,
        ...rest,
        className: `${className} ${isActionDisabled(id) ? 'opacity-50 cursor-not-allowed' : ''}`,
        icon: getActionIcon(id),
        label: getActionLabel(id),
        onClick: isActionDisabled(id) ? () => {} : actionHandlers[id],
        ...(id === 'delete' && {
            modalProps: {
                isOpen: isModalDeleteOpen,
                onConfirm: handleDelete,
                onCancel: () => setIsModalDeleteOpen(false),
            },
        }),
    }))
}
