import { useTranslation } from 'react-i18next'

import { CategoryWithCount } from '@/features/categories/api/categoriesApi'
import { TableRow } from '@/shared/components/table/table-row/TableRow'
import { Table } from '@/shared/components/table/table/Table'
import type { Header } from '@/shared/components/table/table/types'

export interface ProductCategoriesTableProps {
    categories?: CategoryWithCount[]
}

export const ProductCategoriesTable = ({
    categories,
}: ProductCategoriesTableProps) => {
    const { t } = useTranslation(['product', 'category'])

    const headers: Header[] = [
        { label: t('category:table.category'), className: 'text-left w-auto' },
        { label: t('category:table.count'), className: 'text-right w-24' },
    ]

    const cellClasses = headers.map((h) => h.className)

    return (
        <Table
            headers={headers}
            data={categories}
            renderRow={(category) => (
                <TableRow
                    key={category._id}
                    cellClasses={cellClasses}
                    cellData={[
                        t(`categories.${category.name}`),
                        String(category.productCount ?? 0),
                    ]}
                    redirectPath={`/products/category/${category.name}`}
                />
            )}
        />
    )
}
