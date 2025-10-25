import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import {
    clearFormData,
    selectIsDirty,
    setFormData,
} from '@/features/form/slice/formSlice'
import {
    useGetToolByIdQuery,
    useUpdateToolByIdMutation,
} from '@/features/tools/api/toolsApi'
import { ToolForm } from '@/features/tools/components/form/ToolForm'
import type { Tool } from '@/features/tools/types'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const ToolEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useTranslation('tool')

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateToolById, { isLoading }] = useUpdateToolByIdMutation()
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
            navigate(ROUTES.backstage.tools.details(id!))
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <ToolForm
            title={t('titles.edit')}
            onSubmit={handleEditTool}
            isSaving={isLoading}
        />
    )
}
