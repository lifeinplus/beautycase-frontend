import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData } from '../../form/formSlice'
import { StageForm } from '../components/StageForm'
import { useCreateStageMutation } from '../stagesApi'
import type { Stage } from '../types'

export const StageAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [addStage] = useCreateStageMutation()

    const handleAddStage = async (stage: Stage) => {
        const { stepsText, ...newStage } = stage
        const steps = stepsText ? stepsText?.split('\n\n') : undefined

        try {
            const response = await addStage({
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

    return <StageForm title={'Добавить этап'} onSubmit={handleAddStage} />
}
