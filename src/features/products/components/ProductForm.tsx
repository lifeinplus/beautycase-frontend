import { DynamicForm, type FieldConfig } from '../../form'
import type { Product } from '../types'

const ProductForm = ({
    initialData = { name: '', image: '', buy: '' },
    onSubmit,
    title,
}: {
    initialData?: Product
    onSubmit: (data: Product) => void
    title: string
}) => {
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

    return (
        <DynamicForm
            initialData={initialData}
            fields={fields}
            onSubmit={onSubmit}
            title={title}
        />
    )
}

export default ProductForm
