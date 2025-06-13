import {
    ArrowLeftIcon,
    DocumentArrowDownIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { TopPanel } from '../../../components/TopPanel'
import { Hero } from '../../../components/Hero'
import { DataWrapper } from '../../../components/DataWrapper'
import { Footer } from '../../../components/Footer'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { ModalDelete } from '../../../components/ui/ModalDelete'
import { getErrorMessage } from '../../../utils/errorUtils'
import { canAccess } from '../../../utils/menu'
import { selectRole, selectUsername } from '../../auth/authSlice'
import { clearFormData } from '../../form/formSlice'
import { Stages } from '../../stages/components/Stages'
import { Tools } from '../../tools/components/Tools'
import { usePDFExport } from '../hooks/usePDFExport'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '../makeupBagsApi'

const ACTIONS = {
    back: {
        icon: <ArrowLeftIcon className="h-6 w-6" />,
        label: 'Назад',
    },
    export: {
        icon: <DocumentArrowDownIcon className="h-6 w-6" />,
        label: 'PDF',
    },
    edit: {
        icon: <PencilSquareIcon className="h-6 w-6" />,
        label: 'Редактировать',
    },
    delete: {
        icon: <TrashIcon className="h-6 w-6" />,
        label: 'Удалить',
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

    const redirectPath = '/makeup_bags'

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const { exportToPDF, error: exportError, clearError } = usePDFExport()

    const [deleteMakeupBagById] = useDeleteMakeupBagByIdMutation()

    const { data, isLoading, error } = useGetMakeupBagByIdQuery(id!)

    const categoryName = data?.category?.name || 'Косметичка'
    const stages = data?.stages || []
    const tools = data?.tools || []

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    useEffect(() => {
        if (exportError) {
            toast.error(exportError)
            clearError()
        }
    }, [exportError, clearError])

    const handleExportToPDF = async () => {
        if (!data) {
            toast.error('Нет данных для экспорта')
            return
        }

        const filename = `${categoryName.toLowerCase().replace(/\s+/g, '-')}.pdf`

        const result = await exportToPDF(
            {
                category: data.category,
                stages: data.stages,
                tools: data.tools,
            },
            filename
        )

        if (result.success) {
            toast.success('PDF успешно создан')
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
            toast.success('Косметичка удалена')
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    const visibleActions = ACTION_ITEMS.filter((item) =>
        canAccess(item, username, role)
    ).map(({ id, className }) => ({
        key: id,
        className,
        icon: ACTIONS[id].icon,
        label: ACTIONS[id].label,
        onClick: actionHandlers[id],
    }))

    return (
        <article className="page">
            <TopPanel title="Косметичка" onBack={actionHandlers.back} />

            <main className="page-content">
                <article className="content-container">
                    <Hero
                        headline={categoryName}
                        byline="Индивидуальный подбор продуктов"
                        imgUrl="https://res.cloudinary.com/beautycase/image/upload/v1732162378/title_gm1yla.png"
                    />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={[...stages, ...tools]}
                        emptyMessage="Косметичка не найдена"
                    >
                        <>
                            <Stages stages={stages} />
                            <Tools tools={tools} />
                        </>
                    </DataWrapper>
                </article>
            </main>

            <Footer />

            <AdaptiveNavBar>
                {visibleActions.map(
                    ({ key, className, icon, label, onClick }) => (
                        <NavigationButton
                            key={key}
                            className={className}
                            icon={icon}
                            text={label}
                            onClick={onClick}
                        />
                    )
                )}
            </AdaptiveNavBar>

            <ModalDelete
                isOpen={isModalDeleteOpen}
                title="Удалить?"
                description={`Вы действительно хотите удалить эту косметичку?`}
                onConfirm={handleDelete}
                onCancel={() => setIsModalDeleteOpen(false)}
            />
        </article>
    )
}
