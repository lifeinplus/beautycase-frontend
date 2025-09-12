import toast from 'react-hot-toast'

import { useUpdateLessonProductsMutation } from '@/features/lessons/api/lessonsApi'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { ProductSelection } from '@/widgets/product/product-selection/ProductSelection'

export const ProductSelectionForLesson = () => {
    const [updateLessonProducts, { isLoading }] =
        useUpdateLessonProductsMutation()

    const onSave = async (id: string, productIds: string[]) => {
        try {
            await updateLessonProducts({
                id: id,
                data: { productIds },
            }).unwrap()
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <ProductSelection onSave={onSave} isSaving={isLoading} />
}
