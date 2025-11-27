import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { NavBarAction } from '@/app/layout/hooks/types'
import {
    closeModals,
    openDuplicate,
    setDuplicateLoading,
} from '@/app/ui/modalsSlice'
import {
    useDuplicateProductByIdMutation,
    useGetProductByIdQuery,
} from '@/features/products/api/productsApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDuplicateProductAction = (): NavBarAction | null => {
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

    const [duplicateProductById, { isLoading: isDuplicating }] =
        useDuplicateProductByIdMutation()

    useEffect(() => {
        dispatch(setDuplicateLoading(isDuplicating))
    }, [isDuplicating])

    const handleDuplicate = async () => {
        try {
            await duplicateProductById(id!).unwrap()
            dispatch(closeModals())
            navigate(ROUTES.backstage.products.category(data?.category?.name!))
        } catch (err) {
            console.error(err)
            dispatch(
                openDuplicate({
                    title: t('modal:duplicate.titleError'),
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
        key: 'duplicate',
        auth: true,
        icon: DocumentDuplicateIcon,
        label: t('duplicate'),
        roles: [Role.ADMIN, Role.MUA],
        onClick: () => {
            dispatch(
                openDuplicate({
                    title: t('modal:duplicate.title'),
                    description: t('modal:duplicate.description', {
                        name: data?.name,
                    }),
                })
            )
        },
        modalProps: {
            onConfirm: handleDuplicate,
            onCancel: handleCancel,
        },
    }
}
