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

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { TopPanel } from '../../../components/TopPanel'
import { Hero } from '../../../components/Hero'
import { DataWrapper } from '../../../components/DataWrapper'
import { Footer } from '../../../components/Footer'
import { NavBar } from '../../../components/navigation/NavBar'
import { NavButton } from '../../../components/navigation/NavButton'
import { ModalDelete } from '../../../components/ui/ModalDelete'
import config from '../../../config'
import { getErrorMessage } from '../../../utils/errorUtils'
import { canAccess } from '../../../utils/menu'
import { selectRole, selectUsername } from '../../auth/authSlice'
import { clearFormData } from '../../form/formSlice'
import { Stages } from '../../stages/components/Stages'
import { Tools } from '../../tools/components/Tools'
import { usePDFExport } from '../hooks/usePDFExport'
import { generatePdfFilename } from '../utils/generatePdfFilename'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '../makeupBagsApi'

const ACTIONS = {
    back: {
        icon: <ArrowLeftIcon className="h-6 w-6" />,
        label: 'actions.back',
    },
    export: {
        icon: <DocumentArrowDownIcon className="h-6 w-6" />,
        label: 'actions.export',
    },
    edit: {
        icon: <PencilSquareIcon className="h-6 w-6" />,
        label: 'actions.edit',
    },
    delete: {
        icon: <TrashIcon className="h-6 w-6" />,
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
    { id: 'back', className: 'nav-btn-back' },
    { id: 'export', auth: false },
    { id: 'edit', auth: true, roles: ['admin', 'mua'] },
    { id: 'delete', auth: true, roles: ['admin', 'mua'] },
]

export const MakeupBagPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation([
        'makeupBag',
        'modal',
        'component',
        'stage',
        'tool',
    ])

    const redirectPath = '/makeup_bags'

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const [isExporting, setIsExporting] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const { exportToPDF, error: exportError, clearError } = usePDFExport()

    const [deleteMakeupBagById] = useDeleteMakeupBagByIdMutation()
    const { data, isLoading, error } = useGetMakeupBagByIdQuery(id!)

    const categoryName = t(`categories.${data?.category?.name}.full`)
    const clientName = data?.client?.username || ''
    const stages = data?.stages || []
    const tools = data?.tools || []

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

    const getActionIcon = (actionId: ActionId) => {
        if (actionId === 'export' && isExporting) {
            return (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )
        }
        return ACTIONS[actionId].icon
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

    const visibleActions = ACTION_ITEMS.filter((item) =>
        canAccess(item, username, role)
    ).map(({ id, className }) => ({
        key: id,
        className: `${className} ${isActionDisabled(id) ? 'opacity-50 cursor-not-allowed' : ''}`,
        icon: getActionIcon(id),
        label: getActionLabel(id),
        onClick: isActionDisabled(id) ? () => {} : actionHandlers[id],
    }))

    return (
        <article className="page">
            <TopPanel
                title={t('titles.details')}
                onBack={actionHandlers.back}
            />

            <main className="page-content">
                <article className="content-container">
                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={[...stages, ...tools]}
                        emptyMessage={t('emptyMessage')}
                    >
                        <>
                            <Hero
                                headline={categoryName}
                                byline={t('hero.byline')}
                                imgUrl={config.cloudinary.makeupBagHero}
                            />
                            <Stages stages={stages} />
                            <Tools tools={tools} />
                        </>
                    </DataWrapper>
                </article>
            </main>

            {!isLoading && !error && <Footer />}

            <NavBar>
                {visibleActions.map(
                    ({ key, className, icon, label, onClick }) => (
                        <NavButton
                            key={key}
                            className={className}
                            icon={icon}
                            label={t(label)}
                            onClick={onClick}
                        />
                    )
                )}
            </NavBar>

            <ModalDelete
                isOpen={isModalDeleteOpen}
                title={t('modal:delete.title')}
                description={t('modal:delete.description', {
                    name: categoryName,
                })}
                onConfirm={handleDelete}
                onCancel={() => setIsModalDeleteOpen(false)}
            />
        </article>
    )
}
