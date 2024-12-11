import { useParams, useNavigate } from 'react-router-dom'

import ToolForm from '../components/ToolForm'
import { useEditToolMutation, useGetToolByIdQuery } from '../toolsApiSlice'
import type { Tool } from '../types'

export const ToolEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [editTool] = useEditToolMutation()
    const { data: initialTool, isLoading } = useGetToolByIdQuery(id!)

    if (isLoading) return <p>Loading...</p>

    if (!initialTool) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Tool not found</p>
            </div>
        )
    }

    const handleEditTool = async (tool: Tool) => {
        await editTool({
            id: id!,
            ...tool,
        }).unwrap()
        navigate(`/tools_gallery/${id}`)
    }

    return (
        <ToolForm
            initialData={initialTool}
            onSubmit={handleEditTool}
            title={'Редактировать'}
        />
    )
}
