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

import config from '@/app/config'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { clearFormData } from '@/features/form/formSlice'
import { Stages } from '@/features/stages/components/Stages'
import { Tools } from '@/features/tools/components/Tools'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { SpinnerButton } from '@/shared/components/common/SpinnerButton'
import { Footer } from '@/shared/components/layout/Footer'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { ModalDelete } from '@/shared/components/modals/ModalDelete'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { canAccess } from '@/shared/utils/menu'
import { usePDFExport } from '../../features/makeupBags/hooks/usePDFExport'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '../../features/makeupBags/makeupBagsApi'
import { generatePdfFilename } from '../../features/makeupBags/utils/generatePdfFilename'

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
        <article className={pageStyles.page}>
            <TopPanel
                title={t('titles.details')}
                onBack={actionHandlers.back}
            />

            <main className={pageStyles.content}>
                <article className={pageStyles.contentContainer}>
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
