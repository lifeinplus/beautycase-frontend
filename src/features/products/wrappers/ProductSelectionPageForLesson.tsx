import { useUpdateLessonProductsMutation } from '@/features/lessons/lessonsApi'
import { ProductSelectionPage } from '@/widgets/product/ProductSelectionPage'

const ProductSelectionPageForLesson = () => {
    const [updateLessonProducts] = useUpdateLessonProductsMutation()

    const onSave = async (id: string, productIds: string[]) => {
        await updateLessonProducts({
            id: id,
            data: { productIds },
        }).unwrap()
    }

    return <ProductSelectionPage onSave={onSave} />
}

export default ProductSelectionPageForLesson
