import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
    useDeleteUserByIdMutation,
    useGetUserByIdQuery,
} from '@/features/users/api/usersApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteUserAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const isUserDetailsPage = pathname.match(
        /^\/control-center\/users\/[a-f0-9]{24}$/i
    )

    const { data } = useGetUserByIdQuery(id!, {
        skip: !id || !isUserDetailsPage,
    })

    const [deleteUserById, { isLoading: isDeleting }] =
        useDeleteUserByIdMutation()

    const handleDelete = async () => {
        try {
            await deleteUserById(id!).unwrap()
            navigate(ROUTES.controlCenter.users)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id || !isUserDetailsPage) return null

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
                name: data?.user.username,
            }),
            onConfirm: isDeleting ? () => {} : handleDelete,
            onCancel: () => setIsModalDeleteOpen(false),
        },
    }
}
