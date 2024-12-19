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
            name: 'title',
            label: 'Заголовок',
            type: 'text',
            required: true,
        },
        {
            name: 'shortDescription',
            label: 'Краткое описание',
            type: 'text',
            required: true,
        },
        {
            name: 'videoUrl',
            label: 'Ссылка на видео',
            type: 'text',
            required: true,
        },
        {
            name: 'fullDescription',
            label: 'Полное описание',
            type: 'text',
        },
        {
            name: 'selectedProductIds',
            label: 'Продукты',
            type: 'button',
            onClick: () => navigate(`/lessons/edit/${id}/products`),
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}

export default LessonForm
