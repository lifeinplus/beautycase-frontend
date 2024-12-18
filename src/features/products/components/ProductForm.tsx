import { DynamicForm, type FieldConfig } from '../../form'
import type { Product } from '../types'

interface ProductFormProps {
    onSubmit: (data: Product) => void
    title: string
}

const ProductForm = ({ title, onSubmit }: ProductFormProps) => {
    const fields: FieldConfig<Product>[] = [
        {
            name: 'name',
            label: 'Название',
            type: 'text',
            required: true,
        },
        {
            name: 'image',
            label: 'URL изображения',
            type: 'text',
            required: true,
        },
        {
            name: 'buy',
            label: 'Где купить',
            type: 'text',
            required: true,
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}

export default ProductForm
