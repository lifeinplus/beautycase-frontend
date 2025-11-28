import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { closeModals, openDelete, setDeleteLoading } from '@/app/ui/modalsSlice'
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
    const { t } = useTranslation(['actions', 'modal'])

    const dispatch = useAppDispatch()

    const lessonsRoot = ROUTES.backstage.lessons.root
    const isLessonDetailsPage = pathname.match(
        new RegExp(`^${lessonsRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetLessonByIdQuery(id!, {
        skip: !id || !isLessonDetailsPage,
    })

    const [deleteLessonById, { isLoading: isDeleting }] =
        useDeleteLessonByIdMutation()

    useEffect(() => {
        dispatch(setDeleteLoading(isDeleting))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteLessonById(id!).unwrap()
            dispatch(closeModals())
            navigate(lessonsRoot)
        } catch (err) {
            console.error(err)
            dispatch(
                openDelete({
                    title: t('modal:delete.titleError'),
                    description: getErrorMessage(err),
                    isBlocked: true,
                })
            )
        }
    }

    const handleCancel = () => {
        dispatch(closeModals())
    }

    if (!id || !isLessonDetailsPage) return null

    return {
        key: 'delete',
        auth: true,
        icon: TrashIcon,
        label: t('delete'),
        roles: [Role.ADMIN, Role.MUA],
        onClick: () => {
            dispatch(
                openDelete({
                    title: t('modal:delete.title'),
                    description: t('modal:delete.description', {
                        name: data?.title,
                    }),
                })
            )
        },
        modalProps: {
            onConfirm: handleDelete,
            onCancel: handleCancel,
        },
        destructive: true,
    }
}
