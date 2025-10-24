import { useTranslation } from 'react-i18next'

import type { CategoryWithCount } from '@/features/categories/api/categoriesApi'
import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import { ROUTES } from '@/shared/config/routes'

export interface ProductCategoriesMobileViewProps {
    categories?: CategoryWithCount[]
}

export const ProductCategoriesMobileView = ({
    categories,
}: ProductCategoriesMobileViewProps) => {
    const { t } = useTranslation('product')

    return (
        <MobileView
            items={categories}
            getTitle={(c) => t(`categories.${c.name}`)}
            getRightText={(c) => c.productCount.toString()}
            getLink={(c) => ROUTES.backstage.products.category(c.name)}
        />
    )
}
