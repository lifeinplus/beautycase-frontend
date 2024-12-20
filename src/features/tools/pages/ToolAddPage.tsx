import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import ToolForm from '../components/ToolForm'
import { useAddToolMutation } from '../toolsApiSlice'
import type { Tool } from '../types'

export const ToolAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [addTool] = useAddToolMutation()

    const handleAddTool = async (tool: Tool) => {
        try {
            const response = await addTool(tool).unwrap()
            dispatch(clearFormData())
            navigate(`/tools/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <ToolForm title={'Добавить инструмент'} onSubmit={handleAddTool} />
}
