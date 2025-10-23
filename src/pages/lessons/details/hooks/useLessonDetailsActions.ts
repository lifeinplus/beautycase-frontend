import {
    ArrowLeftIcon,
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
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/api/lessonsApi'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useLessonDetailsActions = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const isLessonDetailsPage = pathname.match(/^\/lessons\/[a-f0-9]{24}$/i)

    const { data } = useGetLessonByIdQuery(id!, {
        skip: !id || !isLessonDetailsPage,
    })

    const [deleteLessonById, { isLoading: isDeleting }] =
        useDeleteLessonByIdMutation()

    const redirectPath = '/lessons'

    useEffect(() => {
        if (isLessonDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isLessonDetailsPage])

    const handleDelete = async () => {
        try {
            await deleteLessonById(id!).unwrap()
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id || !isLessonDetailsPage) return []

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
