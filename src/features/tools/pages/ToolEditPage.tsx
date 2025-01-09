import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectIsDirty, setFormData } from '../../form'
import ToolForm from '../components/ToolForm'
import { useEditToolMutation, useGetToolByIdQuery } from '../toolsApiSlice'
import type { Tool } from '../types'

export const ToolEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editTool] = useEditToolMutation()
    const { data, isLoading } = useGetToolByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    name: data.name,
                    image: data.image,
                    number: data.number,
                    comment: data.comment,
                })
            )
        }
    }, [data, dispatch, isDirty])

    if (isLoading) return <p>Loading...</p>

    if (!data) {
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
        navigate(`/tools/${id}`)
    }

    return (
        <ToolForm
            title={'Редактировать инструмент'}
            onSubmit={handleEditTool}
        />
    )
}
