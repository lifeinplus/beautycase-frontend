import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteToolByIdMutation,
    useGetToolByIdQuery,
} from '@/features/tools/api/toolsApi'
import { ModalDeleteProps } from '@/shared/components/modals/delete/ModalDelete'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useToolDetailsActions = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()
    const [modalProps, setModalProps] = useState<ModalDeleteProps>({})

    const isToolDetailsPage = pathname.match(/^\/tools\/[a-f0-9]{24}$/i)

    const { data } = useGetToolByIdQuery(id!, {
        skip: !id || !isToolDetailsPage,
    })

    const [deleteToolById, { isLoading: isDeleting }] =
        useDeleteToolByIdMutation()

    const redirectPath = '/tools'

    useEffect(() => {
        if (isToolDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isToolDetailsPage])

    useEffect(() => {
        setModalProps((prev) => ({ ...prev, isLoading: isDeleting }))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteToolById(id!).unwrap()
            setModalProps({})
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            setModalProps((prev) => ({
                ...prev,
                title: t('modal:delete.titleError'),
                description: getErrorMessage(err),
                isBlocked: true,
            }))
        }
    }

    const handleCancel = () => {
        setModalProps((prev) => ({ ...prev, isOpen: false }))
    }

    if (!id || !isToolDetailsPage) return []

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
            onClick: () =>
                setModalProps({
                    title: t('modal:delete.title'),
                    description: t('modal:delete.description', {
                        name: data?.name,
                    }),
                    onConfirm: handleDelete,
                    onCancel: handleCancel,
                    isOpen: true,
                }),
            modalProps,
        },
    ]
}
