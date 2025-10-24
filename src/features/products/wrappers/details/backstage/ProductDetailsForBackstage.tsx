import { useToCategoryProductsAction } from '@/pages/products/category/hooks/toCategoryProductsAction'
import { ProductDetails } from '@/widgets/product/details/ProductDetails'

export const ProductDetailsForBackstage = () => {
    const action = useToCategoryProductsAction()
    return <ProductDetails onBack={action?.onClick} />
}
