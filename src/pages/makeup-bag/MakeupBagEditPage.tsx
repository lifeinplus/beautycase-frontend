import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
    clearFormData,
    selectIsDirty,
    setFormData,
} from '@/features/form/formSlice'
import type { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { MakeupBagForm } from '../../features/makeupBags/components/MakeupBagForm'
import {
    useGetMakeupBagByIdQuery,
    useUpdateMakeupBagByIdMutation,
} from '../../features/makeupBags/makeupBagsApi'
import type { MakeupBag } from '../../features/makeupBags/types'

export const MakeupBagEditPage = () => {
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation('makeupBag')

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
            await updateMakeupBagById({
                id: id!,
                makeupBag: {
                    categoryId: makeupBag.categoryId,
                    clientId: makeupBag.clientId,
                    stageIds: makeupBag.stageIds,
                    toolIds: makeupBag.toolIds,
                },
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
            title={t('titles.edit')}
            onSubmit={handleEditMakeupBag}
        />
    )
}
