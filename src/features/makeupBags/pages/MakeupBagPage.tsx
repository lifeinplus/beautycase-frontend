import {
    PaintBrushIcon,
    ListBulletIcon,
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    DataWrapper,
    Footer,
    Hero,
    Modal,
    NavigationButton,
    TopPanel,
} from '../../../components'
import { canAccess, getErrorMessage } from '../../../utils'
import { selectRole, selectUsername } from '../../auth'
import { clearFormData } from '../../form'
import { Stages } from '../../stages'
import {
    Brushes,
    useDeleteMakeupBagMutation,
    useGetMakeupBagByIdQuery,
} from '../../makeupBags'

const ACTIONS = {
    back: {
        icon: <ArrowLeftIcon className="h-6 w-6" />,
        label: 'Назад',
    },
    stages: {
        icon: <ListBulletIcon className="h-6 w-6" />,
        label: 'Этапы',
    },
    brushes: {
        icon: <PaintBrushIcon className="h-6 w-6" />,
        label: 'Кисти',
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
    { id: 'stages' },
    { id: 'brushes' },
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

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [deleteMakeupBag] = useDeleteMakeupBagMutation()

    const { data, isLoading, error } = useGetMakeupBagByIdQuery(id!)
    const stageIds = data?.stageIds || []
    const toolIds = data?.toolIds || []

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        back: () =>
            navigate(state?.fromPathname || redirectPath, {
                replace: true,
                state: { scrollId: id },
            }),
        stages: () =>
            document
                .getElementById('stages')
                ?.scrollIntoView({ behavior: 'smooth' }),
        brushes: () =>
            document
                .getElementById('brushes')
                ?.scrollIntoView({ behavior: 'smooth' }),
        edit: () => navigate(`${redirectPath}/edit/${id}`),
        delete: () => setIsModalOpen(true),
    }

    const handleDelete = async () => {
        if (!id) return
        try {
            await deleteMakeupBag(id).unwrap()
            toast.success('Косметичка удалена')
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalOpen(false)
        }
    }

    const visibleItems = ACTION_ITEMS.filter((item) =>
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
                <section className="w-full max-w-2xl">
                    <article className="page-content__container page-content__container-sm">
                        <Hero
                            headline="Косметичка"
                            byline="Индивидуальный подбор продуктов"
                            imgUrl="https://res.cloudinary.com/dtx4nqyeb/image/upload/v1732162378/title_gm1yla.png"
                        />

                        <DataWrapper
                            isLoading={isLoading}
                            error={error}
                            data={[...stageIds, ...toolIds]}
                            emptyMessage="Косметичка не найдена"
                        >
                            <>
                                <Stages stages={data?.stageIds} />
                                <Brushes tools={data?.toolIds} />
                            </>
                        </DataWrapper>
                    </article>
                </section>
            </main>

            <Footer />

            <AdaptiveNavBar>
                {visibleItems.map(
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

            <Modal
                isOpen={isModalOpen}
                title="Удалить?"
                description={`Вы действительно хотите удалить эту косметичку?`}
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </article>
    )
}
