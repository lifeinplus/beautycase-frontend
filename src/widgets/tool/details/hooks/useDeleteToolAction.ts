import { TrashIcon } from '@heroicons/react/24/outline'
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
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteToolAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()

    const toolsRoot = ROUTES.backstage.tools.root
    const isToolDetailsPage = pathname.match(
        new RegExp(`^${toolsRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetToolByIdQuery(id!, {
        skip: !id || !isToolDetailsPage,
    })

    useEffect(() => {
        if (isToolDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isToolDetailsPage])

    const [modalDeleteProps, setModalDeleteProps] = useState<ModalDeleteProps>(
        {}
    )

    const [deleteToolById, { isLoading: isDeleting }] =
        useDeleteToolByIdMutation()

    useEffect(() => {
        setModalDeleteProps((prev) => ({ ...prev, isLoading: isDeleting }))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteToolById(id!).unwrap()
            setModalDeleteProps({})
            navigate(toolsRoot)
        } catch (err) {
            console.error(err)
            setModalDeleteProps((prev) => ({
                ...prev,
                title: t('modal:delete.titleError'),
                description: getErrorMessage(err),
                isBlocked: true,
            }))
        }
    }

    const handleCancel = () => {
        setModalDeleteProps((prev) => ({ ...prev, isOpen: false }))
    }

    if (!id || !isToolDetailsPage) return null

    return {
        key: 'delete',
        auth: true,
        icon: TrashIcon,
        label: t('actions.delete'),
        roles: [Role.ADMIN, Role.MUA],
        onClick: () =>
            setModalDeleteProps({
                title: t('modal:delete.title'),
                description: t('modal:delete.description', {
                    name: data?.name,
                }),
                onConfirm: handleDelete,
                onCancel: handleCancel,
                isOpen: true,
            }),
        modalProps: modalDeleteProps,
    }
}
