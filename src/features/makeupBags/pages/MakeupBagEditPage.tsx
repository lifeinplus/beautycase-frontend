import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData, selectIsDirty, setFormData } from '../../form/formSlice'
import { MakeupBagForm } from '../components/MakeupBagForm'
import {
    useUpdateMakeupBagByIdMutation,
    useGetMakeupBagByIdQuery,
} from '../makeupBagsApi'
import type { MakeupBag } from '../types'

export const MakeupBagEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const isDirty = useAppSelector(selectIsDirty)

    const [updateMakeupBagById] = useUpdateMakeupBagByIdMutation()
    const { data } = useGetMakeupBagByIdQuery(id!)

    useEffect(() => {
        if (data && !isDirty) {
            dispatch(
                setFormData({
                    categoryId: data.category?._id,
                    clientId: data.client?._id,
                    stageIds: data?.stages?.map((s) => s._id!),
                    toolIds: data?.tools?.map((t) => t._id!),
                })
            )
        }
    }, [data, dispatch, isDirty])

    const handleEditMakeupBag = async (makeupBag: MakeupBag) => {
        try {
            await updateMakeupBagById({ id: id!, makeupBag }).unwrap()
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
