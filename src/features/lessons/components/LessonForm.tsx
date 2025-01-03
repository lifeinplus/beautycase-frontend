import { useNavigate, useParams } from 'react-router-dom'

import { DynamicForm, type FieldConfig } from '../../form'
import type { Lesson } from '../types'

interface LessonFormProps {
    onSubmit: (data: Lesson) => void
    title: string
}

const LessonForm = ({ onSubmit, title }: LessonFormProps) => {
    const navigate = useNavigate()
    const { id } = useParams()

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
            rows: 4,
            type: 'textarea',
        },
        {
            label: 'Продукты',
            name: 'selectedProductIds',
            onClick: () => navigate(`/lessons/edit/${id}/products`),
            type: 'button',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}

export default LessonForm
