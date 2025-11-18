import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/api/lessonsApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteLessonAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const lessonsRoot = ROUTES.backstage.lessons.root
    const isLessonDetailsPage = pathname.match(
        new RegExp(`^${lessonsRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetLessonByIdQuery(id!, {
        skip: !id || !isLessonDetailsPage,
    })

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const [deleteLessonById, { isLoading: isDeleting }] =
        useDeleteLessonByIdMutation()

    const handleDelete = async () => {
        try {
            await deleteLessonById(id!).unwrap()
            navigate(lessonsRoot)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id || !isLessonDetailsPage) return null

    return {
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
    }
}
