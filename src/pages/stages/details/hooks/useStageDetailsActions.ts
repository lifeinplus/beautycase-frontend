import {
    ArrowLeftIcon,
    DocumentDuplicateIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '@/features/stages/stagesApi'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const useStageDetailsActions = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [isModalDuplicateOpen, setIsModalDuplicateOpen] = useState(false)

    const { data } = useGetStageByIdQuery(id!, { skip: !id })

    const [deleteStageById, { isLoading: isDeleting }] =
        useDeleteStageByIdMutation()

    const [duplicateStageById] = useDuplicateStageByIdMutation()

    const redirectPath = '/stages'

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const handleDelete = async () => {
        try {
            await deleteStageById(id!).unwrap()
            toast.success(t('modal:delete.toast', { name: data?.title }))
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    const handleDuplicate = async () => {
        try {
            await duplicateStageById(id!).unwrap()
            toast.success(t('modal:duplicate.toast', { name: data?.title }))
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDuplicateOpen(false)
        }
    }

    if (!id) return []

    return [
        {
            key: 'back',
            auth: true,
            className: navStyles.navBtnBack,
            icon: ArrowLeftIcon,
            label: t('actions.back'),
            onClick: () =>
                navigate(state?.fromPathname || redirectPath, {
                    replace: true,
                    state: { scrollId: id },
                }),
        },
        {
            key: 'edit',
            auth: true,
            icon: PencilSquareIcon,
            label: t('actions.edit'),
            roles: ['admin', 'mua'],
            onClick: () => navigate(`${redirectPath}/edit/${id}`),
        },
        {
            key: 'duplicate',
            auth: true,
            icon: DocumentDuplicateIcon,
            label: t('actions.duplicate'),
            roles: ['admin', 'mua'],
            onClick: () => setIsModalDuplicateOpen(true),
            modalProps: {
                isOpen: isModalDuplicateOpen,
                title: t('modal:duplicate.title'),
                description: t('modal:duplicate.description', {
                    name: data?.title,
                }),
                onConfirm: handleDuplicate,
                onCancel: () => setIsModalDuplicateOpen(false),
            },
        },
        {
            key: 'delete',
            auth: true,
            icon: TrashIcon,
            label: t('actions.delete'),
            roles: ['admin', 'mua'],
            onClick: () => setIsModalDeleteOpen(true),
            modalProps: {
                isOpen: isModalDeleteOpen,
                title: t('modal:delete.title'),
                description: t('modal:delete.description', {
                    name: data?.title,
                }),
                onConfirm: isDeleting ? () => {} : handleDelete,
                onCancel: () => setIsModalDeleteOpen(false),
            },
        },
    ]
}
