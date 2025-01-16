import { useGetBrandsQuery } from '../../brands'
import { DynamicForm, type FieldConfig } from '../../form'
import type { Product } from '../types'

interface ProductFormProps {
    onSubmit: (data: Product) => void
    title: string
}

const ProductForm = ({ title, onSubmit }: ProductFormProps) => {
    const { data } = useGetBrandsQuery()

    const fields: FieldConfig<Product>[] = [
        {
            name: 'name',
            label: 'Название',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Бренд',
            name: 'brandId',
            options: data?.map((b) => ({
                text: b.name,
                value: b._id,
            })),
            required: true,
            type: 'select',
        },
        {
            name: 'image',
            label: 'Ссылка на изображение',
            required: true,
            type: 'textarea',
        },
        {
            name: 'stores',
            label: 'Ссылки на магазины',
            type: 'button-store-links',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}

export default ProductForm
