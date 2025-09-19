import type { ProductCategoriesTableProps } from '../ProductCategoriesTable'

export const ProductCategoriesTable = ({
    categories,
}: ProductCategoriesTableProps) => (
    <div data-testid="mocked-product-categories-table">
        {categories?.map((c) => <div key={c._id}>{c.name}</div>)}
    </div>
)
