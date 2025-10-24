import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useCreateStageMutation } from '@/features/stages/api/stagesApi'
import { StageForm } from '@/features/stages/components/form/StageForm'
import type { Stage } from '@/features/stages/types'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const StageAdd = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('stage')

    const dispatch = useAppDispatch()
    const [createStage, { isLoading }] = useCreateStageMutation()

    const handleAddStage = async (stage: Stage) => {
        const { stepsText, ...newStage } = stage
        const steps = stepsText ? stepsText?.split('\n\n') : undefined

        try {
            const response = await createStage({
                ...newStage,
                steps,
            }).unwrap()
            dispatch(clearFormData())
            navigate(ROUTES.backstage.stages.details(response.id))
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <StageForm
            title={t('titles.add')}
            onSubmit={handleAddStage}
            isSaving={isLoading}
        />
    )
}
