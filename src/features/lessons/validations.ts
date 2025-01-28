import { array, object, string } from 'yup'

export const lessonSchema = object({
    title: string().required('Укажите заголовок урока'),
    shortDescription: string().required('Укажите краткое описание'),
    videoUrl: string().required('Укажите ссылку на видео'),
    fullDescription: string().required('Укажите полное описание'),
    selectedProductIds: array()
        .min(1, 'Выберите продукты')
        .required('Выберите продукты'),
})
