import { useTranslation } from 'react-i18next'

import { Category } from '@/features/categories/types'
import { MobileView } from '@/shared/components/table/mobile-view/MobileView'

export interface ProductCategoriesMobileViewProps {
    categories?: Category[]
}

export const ProductCategoriesMobileView = ({
    categories,
}: ProductCategoriesMobileViewProps) => {
    const { t } = useTranslation('product')

    return (
        <MobileView
            items={categories}
            getTitle={(category) => t(`categories.${category.name}`)}
            getLink={(category) => `/products/category/${category.name}`}
        />
    )
}
