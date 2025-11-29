import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import {
    closeModals,
    openDelete,
    setDeleteLoading,
} from '@/app/ui/modals/modalsSlice'
import {
    useDeleteMakeupBagQuestionnaireByIdMutation,
    useGetMakeupBagQuestionnaireByIdQuery,
} from '@/features/questionnaires/api/questionnairesApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDeleteMakeupBagQuestionnaireAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['actions', 'modal'])

    const dispatch = useAppDispatch()

    const questionnairesPath = ROUTES.questionnaires.makeupBags.root
    const isQuestionnaireResultPage = pathname.match(
        new RegExp(`^${questionnairesPath}/[a-f0-9]{24}$`)
    )

    const { data } = useGetMakeupBagQuestionnaireByIdQuery(id!, {
        skip: !id || !isQuestionnaireResultPage,
    })

    const [deleteMakeupBagQuestionnaireById, { isLoading: isDeleting }] =
        useDeleteMakeupBagQuestionnaireByIdMutation()

    useEffect(() => {
        dispatch(setDeleteLoading(isDeleting))
    }, [isDeleting])

    const handleDelete = async () => {
        try {
            await deleteMakeupBagQuestionnaireById(id!).unwrap()
            dispatch(closeModals())
            navigate(questionnairesPath)
        } catch (err) {
            console.error(err)
            dispatch(
                openDelete({
                    title: t('modal:delete.titleError'),
                    description: getErrorMessage(err),
                    isBlocked: true,
                })
            )
        }
    }

    const handleCancel = () => {
        dispatch(closeModals())
    }

    if (!id || !isQuestionnaireResultPage) return null

    return {
        key: 'delete',
        auth: true,
        icon: TrashIcon,
        label: t('delete'),
        roles: [Role.ADMIN],
        onClick: () => {
            dispatch(
                openDelete({
                    title: t('modal:delete.title'),
                    description: t('modal:delete.description', {
                        name: data?.name,
                    }),
                })
            )
        },
        modalProps: {
            onConfirm: handleDelete,
            onCancel: handleCancel,
        },
        destructive: true,
    }
}
