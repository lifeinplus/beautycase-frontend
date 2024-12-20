import { DynamicForm, type FieldConfig } from '../../form'
import type { Tool } from '../types'

interface ToolFormProps {
    onSubmit: (data: Tool) => void
    title: string
}

const ToolForm = ({ title, onSubmit }: ToolFormProps) => {
    const fields: FieldConfig<Tool>[] = [
        {
            name: 'name',
            label: 'Название',
            type: 'text',
            required: true,
        },
        {
            name: 'image',
            label: 'Ссылка на изображение',
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

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}

export default ToolForm
