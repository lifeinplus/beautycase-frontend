import { DynamicForm, type FieldConfig } from '../../form'
import type { Tool } from '../types'

const ToolForm = ({
    initialData = { name: '', image: '', number: '', comment: '' },
    onSubmit,
    title,
}: {
    initialData?: Tool
    onSubmit: (data: Tool) => void
    title: string
}) => {
    const fields: FieldConfig<Tool>[] = [
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
            name: 'number',
            label: 'Номер',
            type: 'text',
        },
        {
            name: 'comment',
            label: 'Комментарий',
            type: 'text',
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

export default ToolForm
