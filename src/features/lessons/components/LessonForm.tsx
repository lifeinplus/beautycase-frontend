import { DynamicForm, type FieldConfig } from '../../form'
import type { Lesson } from '../types'

interface LessonFormProps {
    onSubmit: (data: Lesson) => void
    title: string
}

export const LessonForm = ({ onSubmit, title }: LessonFormProps) => {
    const fields: FieldConfig<Lesson>[] = [
        {
            label: 'Заголовок',
            name: 'title',
            required: true,
            rows: 2,
            type: 'textarea',
        },
        {
            label: 'Краткое описание',
            name: 'shortDescription',
            required: true,
            rows: 2,
            type: 'textarea',
        },
        {
            label: 'Ссылка на видео',
            name: 'videoUrl',
            required: true,
            type: 'text',
        },
        {
            label: 'Полное описание',
            name: 'fullDescription',
            required: true,
            rows: 4,
            type: 'textarea',
        },
        {
            label: 'Продукты',
            name: 'selectedProductIds',
            required: true,
            type: 'button-products',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}
