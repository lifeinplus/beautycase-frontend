import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/productsApi'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const useProductDetailsActions = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const { data } = useGetProductByIdQuery(id!, { skip: !id })
    const [deleteProductById] = useDeleteProductByIdMutation()

    const redirectPath = '/products'

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const handleDelete = async () => {
        try {
            await deleteProductById(id!).unwrap()
            toast.success(t('modal:delete.toast', { name: data?.name }))
            navigate(redirectPath)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id) return []

    return [
        {
            key: 'back',
            auth: true,
            className: navStyles.navBtnBack,
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
            roles: ['admin', 'mua'],
            onClick: () => navigate(`${redirectPath}/edit/${id}`),
        },
        {
            key: 'delete',
            auth: true,
            icon: TrashIcon,
            label: t('actions.delete'),
            roles: ['admin', 'mua'],
            onClick: () => setIsModalDeleteOpen(true),
            modalProps: {
                isOpen: isModalDeleteOpen,
                title: t('modal:delete.title'),
                description: t('modal:delete.description', {
                    name: data?.name,
                }),
                onConfirm: handleDelete,
                onCancel: () => setIsModalDeleteOpen(false),
            },
        },
    ]
}
