import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData, selectIsDirty, setFormData } from '../../form/formSlice'
import { ToolForm } from '../components/ToolForm'
import { useEditToolMutation, useGetToolByIdQuery } from '../toolsApi'
import type { Tool } from '../types'

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
                    brandId: data.brand?._id,
                    name: data.name,
                    imageUrl: data.imageUrl,
                    number: data.number,
                    comment: data.comment,
                    storeLinks: data.storeLinks,
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleEditTool = async (tool: Tool) => {
        try {
            await editTool({ id: id!, body: tool }).unwrap()

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
