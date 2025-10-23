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

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteStageByIdMutation,
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '@/features/stages/api/stagesApi'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useStageDetailsActions = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [isModalDuplicateOpen, setIsModalDuplicateOpen] = useState(false)

    const isStageDetailsPage = pathname.match(/^\/stages\/[a-f0-9]{24}$/i)

    const { data } = useGetStageByIdQuery(id!, {
        skip: !id || !isStageDetailsPage,
    })

    const [deleteStageById, { isLoading: isDeleting }] =
        useDeleteStageByIdMutation()

    const [duplicateStageById] = useDuplicateStageByIdMutation()

    const redirectPath = '/stages'

    useEffect(() => {
        if (isStageDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isStageDetailsPage])

    const handleDelete = async () => {
        try {
            await deleteStageById(id!).unwrap()
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

    if (!id || !isStageDetailsPage) return []

    return [
        {
            key: 'back',
            auth: true,
            className: 'hidden sm:flex',
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
            roles: [Role.ADMIN, Role.MUA],
            onClick: () => navigate(`${redirectPath}/${id}/edit`),
        },
        {
            key: 'duplicate',
            auth: true,
            icon: DocumentDuplicateIcon,
            label: t('actions.duplicate'),
            roles: [Role.ADMIN, Role.MUA],
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
            roles: [Role.ADMIN, Role.MUA],
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
