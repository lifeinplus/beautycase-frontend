import { useTranslation } from 'react-i18next'

import type { Category } from '@/features/categories/types'
import { Table } from '@/shared/components/table/Table'
import { TableRow } from '@/shared/components/table/TableRow'
import type { Header } from '@/shared/types/table'

export interface ProductCategoriesTableProps {
    categories?: Category[]
}

export const ProductCategoriesTable = ({
    categories,
}: ProductCategoriesTableProps) => {
    const { t } = useTranslation(['product', 'category'])

    const headers: Header[] = [
        { label: t('category:table.category'), className: 'text-left w-auto' },
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
                    cellData={[t(`categories.${category.name}`)]}
                    redirectPath={`/products/category/${category.name}`}
                />
            )}
        />
    )
}
