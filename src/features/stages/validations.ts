import { array, object, string } from 'yup'

export const stageSchema = object({
    title: string().required('Укажите заголовок этапа'),
    subtitle: string().required('Укажите подзаголовок этапа'),
    imageUrl: string().required('Укажите ссылку на изображение'),
    stepsText: string().required('Укажите шаги'),
    productIds: array()
        .min(1, 'Выберите продукты')
        .required('Выберите продукты'),
})
