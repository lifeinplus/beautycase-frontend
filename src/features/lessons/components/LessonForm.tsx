import { DynamicForm, type FieldConfig } from '../../../components'
import type { Lesson } from '../types'

const LessonForm = ({
    initialData = {
        title: '',
        shortDescription: '',
        thumbnailUrl: '',
        videoUrl: '',
        fullDescription: '',
    },
    onSubmit,
    title,
}: {
    initialData?: Lesson
    onSubmit: (data: Lesson) => void
    title: string
}) => {
    const fields: FieldConfig<Lesson>[] = [
        {
            name: 'title',
            label: 'Заголовок',
            required: true,
        },
        {
            name: 'shortDescription',
            label: 'Краткое описание',
            required: true,
        },
        {
            name: 'thumbnailUrl',
            label: 'URL миниатюры',
        },
        {
            name: 'videoUrl',
            label: 'URL видео',
        },
        {
            name: 'fullDescription',
            label: 'Полное описание',
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

export default LessonForm
