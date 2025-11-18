import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
    useDeleteMakeupBagQuestionnaireByIdMutation,
    useGetMakeupBagQuestionnaireByIdQuery,
} from '@/features/questionnaires/api/questionnairesApi'
import { ModalDeleteProps } from '@/shared/components/modals/delete/ModalDelete'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteMakeupBagQuestionnaireAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['navigation', 'modal'])

    const questionnairesPath = ROUTES.questionnaires.makeupBags.root
    const isQuestionnaireResultPage = pathname.match(
        new RegExp(`^${questionnairesPath}/[a-f0-9]{24}$`)
    )

    const { data } = useGetMakeupBagQuestionnaireByIdQuery(id!, {
        skip: !id || !isQuestionnaireResultPage,
    })

    const [modalDeleteProps, setModalDeleteProps] = useState<ModalDeleteProps>(
        {}
    )

    const [deleteMakeupBagQuestionnaireById, { isLoading: isDeleting }] =
        useDeleteMakeupBagQuestionnaireByIdMutation()

    useEffect(() => {
        setModalDeleteProps((prev) => ({ ...prev, isLoading: isDeleting }))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteMakeupBagQuestionnaireById(id!).unwrap()
            setModalDeleteProps({})
            navigate(questionnairesPath)
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

    if (!id || !isQuestionnaireResultPage) return null

    return {
        key: 'delete',
        auth: true,
        icon: TrashIcon,
        label: t('actions.delete'),
        roles: [Role.ADMIN],
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
