import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
    useDeleteStageByIdMutation,
    useGetStageByIdQuery,
} from '@/features/stages/api/stagesApi'
import { ModalDeleteProps } from '@/shared/components/modals/delete/ModalDelete'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteStageAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const stagesRoot = ROUTES.backstage.stages.root
    const isStageDetailsPage = pathname.match(
        new RegExp(`^${stagesRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetStageByIdQuery(id!, {
        skip: !id || !isStageDetailsPage,
    })

    const [modalDeleteProps, setModalDeleteProps] = useState<ModalDeleteProps>(
        {}
    )

    const [deleteStageById, { isLoading: isDeleting }] =
        useDeleteStageByIdMutation()

    useEffect(() => {
        setModalDeleteProps((prev) => ({ ...prev, isLoading: isDeleting }))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteStageById(id!).unwrap()
            setModalDeleteProps({})
            navigate(stagesRoot)
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

    if (!id || !isStageDetailsPage) return null

    return {
        key: 'delete',
        auth: true,
        icon: TrashIcon,
        label: t('actions.delete'),
        roles: [Role.ADMIN, Role.MUA],
        onClick: () =>
            setModalDeleteProps({
                title: t('modal:delete.title'),
                description: t('modal:delete.description', {
                    name: data?.title,
                }),
                onConfirm: handleDelete,
                onCancel: handleCancel,
                isOpen: true,
            }),
        modalProps: modalDeleteProps,
    }
}
