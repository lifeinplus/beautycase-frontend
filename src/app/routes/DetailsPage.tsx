import {
    ArrowLeftIcon,
    DocumentDuplicateIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectRole, selectUsername } from '../../features/auth/authSlice'
import { clearFormData } from '../../features/form/formSlice'
import { DataWrapper } from '../../shared/components/common/DataWrapper'
import { NavBar } from '../../shared/components/navigation/NavBar'
import { TopPanel } from '../../shared/components/layout/TopPanel'
import { ModalDelete } from '../../shared/components/modals/ModalDelete'
import { ModalDuplicate } from '../../shared/components/modals/ModalDuplicate'
import { NavButton } from '../../shared/components/navigation/NavButton'
import { getErrorMessage } from '../../shared/utils/errorUtils'
import { canAccess } from '../../shared/utils/menu'

const ACTIONS = {
    back: {
        icon: ArrowLeftIcon,
        label: 'actions.back',
    },
    edit: {
        icon: PencilSquareIcon,
        label: 'actions.edit',
    },
    duplicate: {
        icon: DocumentDuplicateIcon,
        label: 'actions.duplicate',
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

const getActionItems = (showDuplicate: boolean): ActionItem[] => {
    const items: ActionItem[] = [
        { id: 'back', className: 'nav-btn-back' },
        { id: 'edit', auth: true, roles: ['admin', 'mua'] },
        { id: 'delete', auth: true, roles: ['admin', 'mua'] },
    ]

    if (showDuplicate) {
        items.splice(2, 0, {
            id: 'duplicate',
            auth: true,
            roles: ['admin', 'mua'],
        })
    }

    return items
}

export interface DetailsPageProps {
    isLoading: boolean
    error: unknown
    topPanelTitle: string
    redirectPath: string
    title?: string
    subtitle?: string
    description?: string
    deleteItem: (id: string) => any
    duplicateItem?: (id: string) => any
    showDuplicate?: boolean
    mediaContent?: ReactNode
    descriptionContent?: ReactNode
    additionalContent?: ReactNode
}

export const DetailsPage = ({
    isLoading = false,
    error,
    topPanelTitle,
    redirectPath,
    title,
    subtitle,
    description,
    deleteItem,
    duplicateItem = () => {},
    showDuplicate = false,
    mediaContent,
    descriptionContent,
    additionalContent,
}: DetailsPageProps) => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('component')

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [isModalDuplicateOpen, setIsModalDuplicateOpen] = useState(false)

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        back: () =>
            navigate(state?.fromPathname || redirectPath, {
                replace: true,
                state: { scrollId: id },
            }),
        delete: () => setIsModalDeleteOpen(true),
        duplicate: () => setIsModalDuplicateOpen(true),
        edit: () => navigate(`${redirectPath}/edit/${id}`),
    }

    const handleDelete = async () => {
        if (!id) return
        try {
            await deleteItem(id).unwrap()
            toast.success(t('toast.delete', { value: title }))
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    const handleDuplicate = async () => {
        if (!id) return
        try {
            await duplicateItem(id).unwrap()
            toast.success(t('toast.duplicate', { value: title }))
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        }
    }

    const visibleActions = getActionItems(showDuplicate)
        .filter((item) => canAccess(item, username, role))
        .map(({ id, className }) => ({
            key: id,
            className,
            icon: ACTIONS[id].icon,
            label: t(`navigation:${ACTIONS[id].label}`),
            onClick: actionHandlers[id],
        }))

    return (
        <article className="page">
            <TopPanel title={topPanelTitle} onBack={actionHandlers.back} />

            <main className="page-content">
                <article className="content-container">
                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={title}
                        emptyMessage={t('emptyMessage', {
                            value: topPanelTitle,
                        })}
                    >
                        <>
                            <section className="title-container">
                                <h2 className="title-headline">{title}</h2>
                                <p className="title-byline">{subtitle}</p>
                            </section>

                            {mediaContent}

                            {descriptionContent
                                ? descriptionContent
                                : description && (
                                      <section className="content-description">
                                          <p>{description}</p>
                                      </section>
                                  )}

                            {additionalContent}
                        </>
                    </DataWrapper>
                </article>
            </main>

            <NavBar>
                {visibleActions.map(
                    ({ key, className, icon, label, onClick }) => (
                        <NavButton
                            key={key}
                            className={className}
                            icon={icon}
                            label={label}
                            onClick={onClick}
                        />
                    )
                )}
            </NavBar>

            <ModalDelete
                isOpen={isModalDeleteOpen}
                title={t('modal:delete.title')}
                description={t('modal:delete.description', { name: title })}
                onConfirm={handleDelete}
                onCancel={() => setIsModalDeleteOpen(false)}
            />

            <ModalDuplicate
                isOpen={isModalDuplicateOpen}
                title={t('modal:duplicate.title')}
                description={t('modal:duplicate.description', { name: title })}
                onConfirm={handleDuplicate}
                onCancel={() => setIsModalDuplicateOpen(false)}
            />
        </article>
    )
}
