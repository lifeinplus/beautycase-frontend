import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { DynamicForm, type FieldConfig } from '../../../components'
import { selectSelectedProductIds } from '../../products'
import type { Lesson } from '../types'

const LessonForm = ({
    initialData = {
        title: '',
        shortDescription: '',
        videoUrl: '',
        fullDescription: '',
        productIds: [],
    },
    onSubmit,
    title,
}: {
    initialData?: Lesson
    onSubmit: (data: Lesson) => void
    title: string
}) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const selectedProductIds = useAppSelector(selectSelectedProductIds)

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
            label: 'URL видео',
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
            text: selectedProductIds.length
                ? `Выбрано: ${selectedProductIds.length}`
                : 'Выбрать продукты',
            type: 'button',
            onClick: () => navigate(`/lessons/edit/${id}/products`),
        },
    ]

    return (
        <DynamicForm
            initialData={{
                ...initialData,
                selectedProductIds,
            }}
            fields={fields}
            onSubmit={onSubmit}
            title={title}
        />
    )
}

export default LessonForm
