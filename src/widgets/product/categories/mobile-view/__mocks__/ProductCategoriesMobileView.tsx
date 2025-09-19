import type { ProductCategoriesMobileViewProps } from '../ProductCategoriesMobileView'

export const ProductCategoriesMobileView = ({
    categories,
}: ProductCategoriesMobileViewProps) => (
    <div data-testid="mocked-product-categories-mobile-view">
        {categories?.map((c) => <div key={c._id}>{c.name}</div>)}
    </div>
)
