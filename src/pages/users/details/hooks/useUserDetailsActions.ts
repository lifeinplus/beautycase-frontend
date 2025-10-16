import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteUserByIdMutation,
    useGetUserByIdQuery,
} from '@/features/users/api/usersApi'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useUserDetailsActions = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['user', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const isUserDetailsPage = pathname.match(/^\/users\/[a-f0-9]{24}$/i)

    const { data } = useGetUserByIdQuery(id!, {
        skip: !id || !isUserDetailsPage,
    })

    const [deleteUserById, { isLoading: isDeleting }] =
        useDeleteUserByIdMutation()

    const redirectPath = '/users'

    useEffect(() => {
        if (isUserDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isUserDetailsPage])

    const handleDelete = async () => {
        try {
            await deleteUserById(id!).unwrap()
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id || !isUserDetailsPage) return []

    return [
        {
            key: 'back',
            auth: true,
            className: 'hidden sm:flex',
            icon: ArrowLeftIcon,
            label: t('navigation:actions.back'),
            onClick: () =>
                navigate(state?.fromPathname || redirectPath, {
                    replace: true,
                    state: { scrollId: id },
                }),
        },
        {
            key: 'delete',
            auth: true,
            icon: TrashIcon,
            label: t('navigation:actions.delete'),
            roles: ['admin', 'mua'],
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
        },
    ]
}
