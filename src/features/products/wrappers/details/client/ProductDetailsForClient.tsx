import { useToAccountAction } from '@/pages/account/hooks/useToAccountAction'
import { ProductDetails } from '@/widgets/product/details/ProductDetails'

export const ProductDetailsForClient = () => {
    const action = useToAccountAction()
    return <ProductDetails onBack={action.onClick} />
}
