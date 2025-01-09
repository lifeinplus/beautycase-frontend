import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LoadingOrError } from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData, selectIsDirty, setFormData } from '../../form'
import {
    type Stage,
    StageForm,
    useEditStageMutation,
    useGetStageByIdQuery,
} from '../../stages'

export const StageEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editStage] = useEditStageMutation()
    const { data, isLoading, error } = useGetStageByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    title: data.title,
                    subtitle: data.subtitle,
                    image: data.image,
                    steps: data.steps,
                    selectedProductIds: data?.productIds?.map((p) => p._id!),
                })
            )
        }
    }, [data, dispatch, isDirty])

    if (isLoading) return <LoadingOrError message="Загрузка..." />
    if (error) return <LoadingOrError message="Ошибка загрузки" />
    if (!data) return <LoadingOrError message="Этап не найден" />

    const handleEditStage = async (stage: Stage) => {
        try {
            await editStage({
                id: id!,
                ...stage,
            }).unwrap()

            dispatch(clearFormData())
            navigate(`/stages/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <StageForm title={'Редактировать этап'} onSubmit={handleEditStage} />
}
