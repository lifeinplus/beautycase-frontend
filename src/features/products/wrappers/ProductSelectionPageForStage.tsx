import toast from 'react-hot-toast'

import { useUpdateStageProductsMutation } from '@/features/stages/stagesApi'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { ProductSelection } from '@/widgets/product/product-selection/ProductSelection'

const ProductSelectionPageForStage = () => {
    const [updateStageProducts] = useUpdateStageProductsMutation()

    const onSave = async (id: string, productIds: string[]) => {
        try {
            await updateStageProducts({
                id: id,
                data: { productIds },
            }).unwrap()
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <ProductSelection onSave={onSave} />
}

export default ProductSelectionPageForStage
