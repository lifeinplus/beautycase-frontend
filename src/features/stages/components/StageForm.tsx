import { DynamicForm, type FieldConfig } from '../../form'
import type { Stage } from '../types'

interface StageFormProps {
    onSubmit: (data: Stage) => void
    title: string
}

export const StageForm = ({ onSubmit, title }: StageFormProps) => {
    const fields: FieldConfig<Stage>[] = [
        {
            label: 'Заголовок',
            name: 'title',
            required: true,
            type: 'text',
        },
        {
            label: 'Подзаголовок',
            name: 'subtitle',
            required: true,
            type: 'text',
        },
        {
            label: 'Ссылка на изображение',
            name: 'image',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Шаги',
            name: 'steps',
            rows: 10,
            type: 'textarea-steps',
        },
        {
            label: 'Продукты',
            name: 'selectedProductIds',
            type: 'button-products',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}
