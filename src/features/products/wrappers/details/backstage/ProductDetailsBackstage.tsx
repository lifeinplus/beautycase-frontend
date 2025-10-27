import { useToCategoryProductsAction } from '@/pages/products/category/hooks/useToCategoryProductsAction'
import { ProductDetails } from '@/widgets/product/details/ProductDetails'

export const ProductDetailsBackstage = () => {
    const action = useToCategoryProductsAction()
    return <ProductDetails onBack={action?.onClick} />
}
