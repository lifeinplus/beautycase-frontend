import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData } from '../../form/formSlice'
import { MakeupBagForm } from '../components/MakeupBagForm'
import { useCreateMakeupBagMutation } from '../makeupBagsApi'
import type { MakeupBag } from '../types'

export const MakeupBagAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [createMakeupBag] = useCreateMakeupBagMutation()

    const handleAddMakeupBag = async (makeupBag: MakeupBag) => {
        try {
            const response = await createMakeupBag(makeupBag).unwrap()
            dispatch(clearFormData())
            navigate(`/makeup_bags/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <MakeupBagForm
            title={'Добавить косметичку'}
            onSubmit={handleAddMakeupBag}
        />
    )
}
