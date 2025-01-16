import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils'
import { clearFormData, selectIsDirty, setFormData } from '../../form'
import {
    type Tool,
    ToolForm,
    useEditToolMutation,
    useGetToolByIdQuery,
} from '../../tools'

export const ToolEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editTool] = useEditToolMutation()
    const { data } = useGetToolByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    brandId: data.brandId._id,
                    name: data.name,
                    image: data.image,
                    number: data.number,
                    comment: data.comment,
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleEditTool = async (tool: Tool) => {
        try {
            await editTool({
                id: id!,
                ...tool,
            }).unwrap()

            dispatch(clearFormData())
            navigate(`/tools/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <ToolForm
            title={'Редактировать инструмент'}
            onSubmit={handleEditTool}
        />
    )
}
