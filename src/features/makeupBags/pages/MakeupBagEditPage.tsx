import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LoadingOrError } from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData, selectIsDirty, setFormData } from '../../form'
import {
    type MakeupBag,
    MakeupBagForm,
    useEditMakeupBagMutation,
    useGetMakeupBagByIdQuery,
} from '../../makeupBags'

export const MakeupBagEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [editMakeupBag] = useEditMakeupBagMutation()
    const { data, isLoading, error } = useGetMakeupBagByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    clientId: data.clientId,
                })
            )
        }
    }, [data, dispatch, isDirty])

    if (isLoading) return <LoadingOrError message="Загрузка..." />
    if (error) return <LoadingOrError message="Ошибка загрузки" />
    if (!data) return <LoadingOrError message="Косметичка не найдена" />

    const handleEditMakeupBag = async (makeupBag: MakeupBag) => {
        try {
            await editMakeupBag({
                id: id!,
                ...makeupBag,
            }).unwrap()

            dispatch(clearFormData())
            navigate(`/makeup_bags/${id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <MakeupBagForm
            title={'Редактировать косметичку'}
            onSubmit={handleEditMakeupBag}
        />
    )
}
