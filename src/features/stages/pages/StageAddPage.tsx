import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { type Stage, StageForm, useAddStageMutation } from '../../stages'

export const StageAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [addStage] = useAddStageMutation()

    const handleAddStage = async (stage: Stage) => {
        try {
            const response = await addStage(stage).unwrap()
            dispatch(clearFormData())
            navigate(`/stages/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <StageForm title={'Добавить этап'} onSubmit={handleAddStage} />
}
