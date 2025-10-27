import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
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
    const { t } = useTranslation(['navigation', 'modal'])

    const dispatch = useAppDispatch()
    const [isModalDuplicateOpen, setIsModalDuplicateOpen] = useState(false)

    const stagesRoot = ROUTES.backstage.stages.root

    const isStageDetailsPage = pathname.match(
        new RegExp(`^${stagesRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetStageByIdQuery(id!, {
        skip: !id || !isStageDetailsPage,
    })

    const [duplicateStageById] = useDuplicateStageByIdMutation()

    useEffect(() => {
        if (isStageDetailsPage) {
            dispatch(clearFormData())
        }
    }, [dispatch, isStageDetailsPage])

    const handleDuplicate = async () => {
        try {
            await duplicateStageById(id!).unwrap()
            navigate(stagesRoot)
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDuplicateOpen(false)
        }
    }

    if (!id || !isStageDetailsPage) return null

    return {
        key: 'duplicate',
        auth: true,
        icon: DocumentDuplicateIcon,
        label: t('actions.duplicate'),
        roles: [Role.ADMIN, Role.MUA],
        onClick: () => setIsModalDuplicateOpen(true),
        modalProps: {
            isOpen: isModalDuplicateOpen,
            title: t('modal:duplicate.title'),
            description: t('modal:duplicate.description', {
                name: data?.title,
            }),
            onConfirm: handleDuplicate,
            onCancel: () => setIsModalDuplicateOpen(false),
        },
    }
}
