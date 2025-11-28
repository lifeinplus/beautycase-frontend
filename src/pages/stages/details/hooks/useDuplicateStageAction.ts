import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import {
    closeModals,
    openDuplicate,
    setDuplicateLoading,
} from '@/app/ui/modalsSlice'
import {
    useDuplicateStageByIdMutation,
    useGetStageByIdQuery,
} from '@/features/stages/api/stagesApi'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const useDuplicateStageAction = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation(['actions', 'modal'])

    const dispatch = useAppDispatch()

    const stagesRoot = ROUTES.backstage.stages.root
    const isStageDetailsPage = pathname.match(
        new RegExp(`^${stagesRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetStageByIdQuery(id!, {
        skip: !id || !isStageDetailsPage,
    })

    const [duplicateStageById, { isLoading: isDuplicating }] =
        useDuplicateStageByIdMutation()

    useEffect(() => {
        dispatch(setDuplicateLoading(isDuplicating))
    }, [isDuplicating])

    const handleDuplicate = async () => {
        try {
            await duplicateStageById(id!).unwrap()
            dispatch(closeModals())
            navigate(stagesRoot)
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

    if (!id || !isStageDetailsPage) return null

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
                        name: data?.title,
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
