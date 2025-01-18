import { useGetBrandsQuery } from '../../brands'
import { DynamicForm, type FieldConfig } from '../../form'
import type { Tool } from '../types'

interface ToolFormProps {
    onSubmit: (data: Tool) => void
    title: string
}

export const ToolForm = ({ title, onSubmit }: ToolFormProps) => {
    const { data } = useGetBrandsQuery()

    const fields: FieldConfig<Tool>[] = [
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
            label: 'Название',
            name: 'name',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Ссылка на изображение',
            name: 'image',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Номер',
            name: 'number',
            type: 'text',
        },
        {
            label: 'Комментарий',
            name: 'comment',
            type: 'textarea',
        },
        {
            label: 'Ссылки на товар',
            name: 'storeLinks',
            type: 'button-store-links',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}
