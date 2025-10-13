import {
    ArrowLeftIcon,
    DocumentDuplicateIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteProductByIdMutation,
    useDuplicateProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import type { ModalDeleteProps } from '@/shared/components/modals/delete/ModalDelete'
import type { ModalDuplicateProps } from '@/shared/components/modals/duplicate/ModalDuplicate'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useProductDetailsActions = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()

    const isProductDetailsPage = pathname.match(/^\/products\/[a-f0-9]{24}$/i)

    const { data } = useGetProductByIdQuery(id!, {
        skip: !id || !isProductDetailsPage,
    })

    const productCategoryPath = `/products/category/${data?.category?.name}`

    useEffect(() => {
        if (isProductDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isProductDetailsPage])

    const [modalDeleteProps, setModalDeleteProps] = useState<ModalDeleteProps>(
        {}
    )

    const [modalDuplicateProps, setModalDuplicateProps] =
        useState<ModalDuplicateProps>({})

    const [deleteProductById, { isLoading: isDeleting }] =
        useDeleteProductByIdMutation()

    const [duplicateProductById, { isLoading: isDuplicating }] =
        useDuplicateProductByIdMutation()

    useEffect(() => {
        setModalDeleteProps((prev) => ({ ...prev, isLoading: isDeleting }))
    }, [isDeleting])

    useEffect(() => {
        setModalDuplicateProps((prev) => ({
            ...prev,
            isLoading: isDuplicating,
        }))
    }, [isDuplicating])

    const handleDelete = async () => {
        try {
            await deleteProductById(id!).unwrap()
            setModalDeleteProps({})
            navigate(productCategoryPath)
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

    const handleDuplicate = async () => {
        try {
            await duplicateProductById(id!).unwrap()
            setModalDuplicateProps({})
            navigate(productCategoryPath)
        } catch (err) {
            console.error(err)
            setModalDuplicateProps((prev) => ({
                ...prev,
                title: t('modal:duplicate.titleError'),
                description: getErrorMessage(err),
                isBlocked: true,
            }))
        }
    }

    const handleCancel = () => {
        setModalDeleteProps((prev) => ({ ...prev, isOpen: false }))
        setModalDuplicateProps((prev) => ({ ...prev, isOpen: false }))
    }

    if (!id || !isProductDetailsPage) return []

    return [
        {
            key: 'back',
            auth: true,
            className: 'hidden sm:flex',
            icon: ArrowLeftIcon,
            label: t('actions.back'),
            onClick: () =>
                navigate(state?.fromPathname || productCategoryPath, {
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
            onClick: () => navigate(`/products/${id}/edit`),
        },
        {
            key: 'duplicate',
            auth: true,
            icon: DocumentDuplicateIcon,
            label: t('actions.duplicate'),
            roles: ['admin', 'mua'],
            onClick: () =>
                setModalDuplicateProps({
                    title: t('modal:duplicate.title'),
                    description: t('modal:duplicate.description', {
                        name: data?.name,
                    }),
                    onConfirm: handleDuplicate,
                    onCancel: handleCancel,
                    isOpen: true,
                }),
            modalProps: modalDuplicateProps,
        },
        {
            key: 'delete',
            auth: true,
            icon: TrashIcon,
            label: t('actions.delete'),
            roles: ['admin', 'mua'],
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
        },
    ]
}
