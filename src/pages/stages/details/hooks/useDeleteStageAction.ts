import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import {
    useDeleteStageByIdMutation,
    useGetStageByIdQuery,
} from '@/features/stages/api/stagesApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteStageAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['stage', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

    const stagesRoot = ROUTES.backstage.stages.root

    const isStageDetailsPage = pathname.match(
        new RegExp(`^${stagesRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetStageByIdQuery(id!, {
        skip: !id || !isStageDetailsPage,
    })

    const [deleteStageById, { isLoading: isDeleting }] =
        useDeleteStageByIdMutation()

    useEffect(() => {
        if (isStageDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isStageDetailsPage])

    const handleDelete = async () => {
        try {
            await deleteStageById(id!).unwrap()
            navigate(stagesRoot)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    if (!id || !isStageDetailsPage) return null

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
                name: data?.title,
            }),
            onConfirm: isDeleting ? () => {} : handleDelete,
            onCancel: () => setIsModalDeleteOpen(false),
        },
    }
}
