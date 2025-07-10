import { useUpdateStageProductsMutation } from '@/features/stages/stagesApi'
import { ProductSelectionPage } from '@/widgets/product/ProductSelectionPage'

const ProductSelectionPageForStage = () => {
    const [updateStageProducts] = useUpdateStageProductsMutation()

    const onSave = async (id: string, productIds: string[]) => {
        await updateStageProducts({
            id: id,
            data: { productIds },
        }).unwrap()
    }

    return <ProductSelectionPage onSave={onSave} />
}

export default ProductSelectionPageForStage
