import toast from 'react-hot-toast'

import { useUpdateLessonProductsMutation } from '@/features/lessons/lessonsApi'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { ProductSelectionPage } from '@/widgets/product/ProductSelectionPage'

const ProductSelectionPageForLesson = () => {
    const [updateLessonProducts] = useUpdateLessonProductsMutation()

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

    return <ProductSelectionPage onSave={onSave} />
}

export default ProductSelectionPageForLesson
