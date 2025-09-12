import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useProductDetailsActions = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const isProductDetailsPage = pathname.match(/^\/products\/[a-f0-9]{24}$/i)

    const { data } = useGetProductByIdQuery(id!, {
        skip: !id || !isProductDetailsPage,
    })

    const [deleteProductById, { isLoading: isDeleting }] =
        useDeleteProductByIdMutation()

    const redirectPath = '/products'

    useEffect(() => {
        if (isProductDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isProductDetailsPage])

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

    if (!id || !isProductDetailsPage) return []

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
            onClick: () => navigate(`${redirectPath}/${id}/edit`),
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
                onConfirm: isDeleting ? () => {} : handleDelete,
                onCancel: () => setIsModalDeleteOpen(false),
            },
        },
    ]
}
