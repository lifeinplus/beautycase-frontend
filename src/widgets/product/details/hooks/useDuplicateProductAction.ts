import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDuplicateProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import type { ModalDuplicateProps } from '@/shared/components/modals/duplicate/ModalDuplicate'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDuplicateProductAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()

    const productsRoot = ROUTES.backstage.products.root
    const isProductDetailsPage = pathname.match(
        new RegExp(`^${productsRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetProductByIdQuery(id!, {
        skip: !id || !isProductDetailsPage,
    })

    useEffect(() => {
        if (isProductDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isProductDetailsPage])

    const [modalDuplicateProps, setModalDuplicateProps] =
        useState<ModalDuplicateProps>({})

    const [duplicateProductById, { isLoading: isDuplicating }] =
        useDuplicateProductByIdMutation()

    useEffect(() => {
        setModalDuplicateProps((prev) => ({
            ...prev,
            isLoading: isDuplicating,
        }))
    }, [isDuplicating])

    const handleDuplicate = async () => {
        try {
            await duplicateProductById(id!).unwrap()
            setModalDuplicateProps({})
            navigate(ROUTES.backstage.products.category(data?.category?.name!))
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
        setModalDuplicateProps((prev) => ({ ...prev, isOpen: false }))
    }

    if (!id || !isProductDetailsPage) return null

    return {
        key: 'duplicate',
        auth: true,
        icon: DocumentDuplicateIcon,
        label: t('actions.duplicate'),
        roles: [Role.ADMIN, Role.MUA],
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
    }
}
