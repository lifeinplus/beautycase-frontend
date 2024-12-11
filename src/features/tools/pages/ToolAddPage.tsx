import { useNavigate } from 'react-router-dom'

import ToolForm from '../components/ToolForm'
import { useAddToolMutation } from '../toolsApiSlice'
import { Tool } from '../types'

export const ToolAddPage = () => {
    const navigate = useNavigate()
    const [createTool] = useAddToolMutation()

    const handleAddTool = async (tool: Tool) => {
        await createTool(tool).unwrap()
        navigate('/tools_gallery')
    }

    return <ToolForm onSubmit={handleAddTool} title={'Добавить инструмент'} />
}
