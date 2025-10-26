import { useToHomeAction } from '@/pages/home/hooks/useToHomeAction'
import { ProductDetails } from '@/widgets/product/details/ProductDetails'

export const ProductDetailsViewMode = () => {
    const action = useToHomeAction()
    return <ProductDetails onBack={action.onClick} viewMode />
}
