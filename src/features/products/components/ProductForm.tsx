import { useGetBrandsQuery } from '../../brands'
import { DynamicForm, type FieldConfig } from '../../form'
import type { Product } from '../types'

interface ProductFormProps {
    onSubmit: (data: Product) => void
    title: string
}

export const ProductForm = ({ title, onSubmit }: ProductFormProps) => {
    const { data } = useGetBrandsQuery()

    const fields: FieldConfig<Product>[] = [
        {
            label: 'Название',
            name: 'name',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Бренд',
            name: 'brandId',
            options: data?.map((d) => ({
                text: d.name,
                value: d._id,
            })),
            required: true,
            type: 'select',
        },
        {
            label: 'Ссылка на изображение',
            name: 'image',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Ссылки на товар',
            name: 'stores',
            type: 'button-store-links',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}
