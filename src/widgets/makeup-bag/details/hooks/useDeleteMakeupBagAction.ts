import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '@/features/makeup-bags/api/makeupBagsApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteMakeupBagAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['makeupBag', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const isMakeupBagDetailsPage = pathname.match(
        new RegExp(`^${ROUTES.backstage.makeupBags()}/[a-f0-9]{24}$`)
    )

    const { data } = useGetMakeupBagByIdQuery(id!, {
        skip: !id || !isMakeupBagDetailsPage,
    })

    const [deleteMakeupBagById, { isLoading: isDeleting }] =
        useDeleteMakeupBagByIdMutation()

    const categoryName = t(`categories.${data?.category?.name}.full`)

    useEffect(() => {
        if (isMakeupBagDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isMakeupBagDetailsPage])

    const handleDelete = async () => {
        try {
            await deleteMakeupBagById(id!).unwrap()
            navigate(ROUTES.backstage.makeupBags())
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id || !isMakeupBagDetailsPage) return null

    return {
        key: 'delete',
        auth: true,
        icon: TrashIcon,
        label: t('navigation:actions.delete'),
        roles: [Role.ADMIN, Role.MUA],
        onClick: () => setIsModalDeleteOpen(true),
        modalProps: {
            isOpen: isModalDeleteOpen,
            title: t('modal:delete.title'),
            description: t('modal:delete.description', {
                name: categoryName,
            }),
            onConfirm: isDeleting ? () => {} : handleDelete,
            onCancel: () => setIsModalDeleteOpen(false),
        },
    }
}
