import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import { ModalDeleteProps } from '@/shared/components/modals/delete/ModalDelete'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteProductAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['actions', 'modal'])

    const productsRoot = ROUTES.backstage.products.root
    const isProductDetailsPage = pathname.match(
        new RegExp(`^${productsRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetProductByIdQuery(id!, {
        skip: !id || !isProductDetailsPage,
    })

    const [modalDeleteProps, setModalDeleteProps] = useState<ModalDeleteProps>(
        {}
    )

    const [deleteProductById, { isLoading: isDeleting }] =
        useDeleteProductByIdMutation()

    useEffect(() => {
        setModalDeleteProps((prev) => ({ ...prev, isLoading: isDeleting }))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteProductById(id!).unwrap()
            setModalDeleteProps({})
            navigate(ROUTES.backstage.products.category(data?.category?.name!))
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

    if (!id || !isProductDetailsPage) return null

    return {
        key: 'delete',
        auth: true,
        icon: TrashIcon,
        label: t('delete'),
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
