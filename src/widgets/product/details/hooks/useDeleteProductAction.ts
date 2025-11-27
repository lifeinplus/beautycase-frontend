import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { closeModals, openDelete, setDeleteLoading } from '@/app/ui/modalsSlice'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteProductAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['actions', 'modal'])

    const dispatch = useAppDispatch()

    const productsRoot = ROUTES.backstage.products.root
    const isProductDetailsPage = pathname.match(
        new RegExp(`^${productsRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetProductByIdQuery(id!, {
        skip: !id || !isProductDetailsPage,
    })

    const [deleteProductById, { isLoading: isDeleting }] =
        useDeleteProductByIdMutation()

    useEffect(() => {
        dispatch(setDeleteLoading(isDeleting))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteProductById(id!).unwrap()
            dispatch(closeModals())
            navigate(ROUTES.backstage.products.category(data?.category?.name!))
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

    if (!id || !isProductDetailsPage) return null

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
