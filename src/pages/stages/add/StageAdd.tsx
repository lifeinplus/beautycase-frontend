import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { StageForm } from '@/features/stages/components/StageForm'
import { useCreateStageMutation } from '@/features/stages/stagesApi'
import type { Stage } from '@/features/stages/types'
import { getErrorMessage } from '@/shared/utils/errorUtils'

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
            navigate(`/stages/${response.id}`)
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
