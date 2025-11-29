import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import {
    closeModals,
    openDelete,
    setDeleteLoading,
} from '@/app/ui/modals/modalsSlice'
import {
    useDeleteToolByIdMutation,
    useGetToolByIdQuery,
} from '@/features/tools/api/toolsApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteToolAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['actions', 'modal'])

    const dispatch = useAppDispatch()

    const toolsRoot = ROUTES.backstage.tools.root
    const isToolDetailsPage = pathname.match(
        new RegExp(`^${toolsRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetToolByIdQuery(id!, {
        skip: !id || !isToolDetailsPage,
    })

    const [deleteToolById, { isLoading: isDeleting }] =
        useDeleteToolByIdMutation()

    useEffect(() => {
        dispatch(setDeleteLoading(isDeleting))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteToolById(id!).unwrap()
            dispatch(closeModals())
            navigate(toolsRoot)
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

    if (!id || !isToolDetailsPage) return null

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
                        name: data?.name,
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
