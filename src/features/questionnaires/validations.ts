import { boolean, mixed, number, object, string } from 'yup'

const transformAllFalse = (value: any) => {
    return value && Object.values(value).every((v) => v === false)
        ? undefined
        : value
}

const transformEmpty = (value: any, originalValue: any) => {
    return originalValue === '' || originalValue === null ? undefined : value
}

export const schema = object({
    age: number().transform(transformEmpty),
    allergies: string().transform(transformEmpty),
    budget: string().transform(transformEmpty),
    brushes: string().transform(transformEmpty),
    city: string().transform(transformEmpty),
    currentSkills: string().transform(transformEmpty),
    desiredSkills: object({
        bright: boolean(),
        delicate: boolean(),
        evening: boolean(),
        office: boolean(),
        filming: boolean(),
    })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    instagram: string().transform(transformEmpty),
    makeupBag: string().required('Укажите, что сейчас есть в косметичке'),
    makeupBagPhotoId: string(),
    makeupBagPhotoFile: mixed<File>()
        .test('file-types', 'Неподдерживаемый тип файла', (file) => {
            if (!file) return true
            return ['image/jpeg', 'image/png', 'image/heic'].includes(file.type)
        })
        .test('file-sizes', 'Размер файла превышает ограничение', (file) => {
            if (!file) return true
            return file.size <= 5 * 1024 * 1024
        })
        .optional(),
    makeupTime: string().transform(transformEmpty),
    name: string().required('Укажите ваше имя'),
    oilyShine: string().transform(transformEmpty),
    peeling: string().transform(transformEmpty),
    pores: string().transform(transformEmpty),
    problems: object({
        eyeshadowCrease: boolean(),
        eyeshadowMatch: boolean(),
        foundationPores: boolean(),
        foundationStay: boolean(),
        mascaraSmudge: boolean(),
        other: string(),
        sculpting: boolean(),
    })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    procedures: object({
        browCorrection: boolean(),
        lashExtensions: boolean(),
        lashLamination: boolean(),
        none: boolean(),
    })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    referral: string().transform(transformEmpty),
    skinType: string().transform(transformEmpty),
})
