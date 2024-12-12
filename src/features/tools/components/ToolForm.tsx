import { DynamicForm, type FieldConfig } from '../../../components'
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
            required: true,
        },
        {
            name: 'image',
            label: 'URL изображения',
            required: true,
        },
        {
            name: 'number',
            label: 'Номер',
        },
        {
            name: 'comment',
            label: 'Комментарий',
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
