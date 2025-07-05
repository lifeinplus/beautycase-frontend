import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../shared/utils/errorUtils'
import { clearFormData, selectIsDirty, setFormData } from '../../form/formSlice'
import { ToolForm } from '../components/ToolForm'
import { useUpdateToolByIdMutation, useGetToolByIdQuery } from '../toolsApi'
import type { Tool } from '../types'

export const ToolEditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation('tool')

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateToolById] = useUpdateToolByIdMutation()
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
            await updateToolById({ id: id!, tool }).unwrap()
            dispatch(clearFormData())
            navigate(`/tools/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <ToolForm title={t('titles.edit')} onSubmit={handleEditTool} />
}
