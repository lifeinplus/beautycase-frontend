import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData } from '../../form/formSlice'
import { ToolForm } from '../components/ToolForm'
import { useCreateToolMutation } from '../toolsApi'
import type { Tool } from '../types'

export const ToolAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [createTool] = useCreateToolMutation()

    const handleAddTool = async (tool: Tool) => {
        try {
            const response = await createTool(tool).unwrap()
            dispatch(clearFormData())
            navigate(`/tools/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <ToolForm title={'Добавить инструмент'} onSubmit={handleAddTool} />
}
