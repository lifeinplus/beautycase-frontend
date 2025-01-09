import { useGetBrandsQuery } from '../../brands'
import { DynamicForm, type FieldConfig } from '../../form'
import type { Tool } from '../types'

interface ToolFormProps {
    onSubmit: (data: Tool) => void
    title: string
}

export const ToolForm = ({ title, onSubmit }: ToolFormProps) => {
    const { data: brands } = useGetBrandsQuery()

    const fields: FieldConfig<Tool>[] = [
        {
            label: 'Название',
            name: 'name',
            required: true,
            type: 'text',
        },
        {
            label: 'Бренд',
            name: 'brandId',
            options: brands?.map((b) => ({
                text: b.name,
                value: b._id,
            })),
            required: true,
            type: 'select',
        },
        {
            label: 'Ссылка на изображение',
            name: 'image',
            required: true,
            type: 'text',
        },
        {
            label: 'Номер',
            name: 'number',
            type: 'text',
        },
        {
            label: 'Комментарий',
            name: 'comment',
            type: 'text',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}
