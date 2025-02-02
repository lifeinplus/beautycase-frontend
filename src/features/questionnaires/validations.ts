import * as yup from 'yup'

const transformAllFalse = (value: any) => {
    return value && Object.values(value).every((v) => v === false)
        ? undefined
        : value
}

const transformEmpty = (value: any, originalValue: any) => {
    return originalValue === '' || originalValue === null ? undefined : value
}

export const schema = yup.object({
    age: yup.number().transform(transformEmpty),
    allergies: yup.string().transform(transformEmpty),
    budget: yup.string().transform(transformEmpty),
    brushes: yup.string().transform(transformEmpty),
    city: yup.string().transform(transformEmpty),
    currentSkills: yup.string().transform(transformEmpty),
    desiredSkills: yup
        .object({
            bright: yup.boolean(),
            delicate: yup.boolean(),
            evening: yup.boolean(),
            office: yup.boolean(),
            filming: yup.boolean(),
        })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    instagram: yup.string().transform(transformEmpty),
    makeupBag: yup.string().required('Укажите, что сейчас есть в косметичке'),
    makeupBagPhotoId: yup.string(),
    makeupBagPhotoFile: yup
        .mixed<File>()
        .test('file-types', 'Неподдерживаемый тип файла', (file) => {
            if (!file) return true
            return ['image/jpeg', 'image/png', 'image/heic'].includes(file.type)
        })
        .test('file-sizes', 'Размер файла превышает ограничение', (file) => {
            if (!file) return true
            return file.size <= 5 * 1024 * 1024
        })
        .optional(),
    makeupTime: yup.string().transform(transformEmpty),
    name: yup.string().required('Укажите ваше имя'),
    oilyShine: yup.string().transform(transformEmpty),
    peeling: yup.string().transform(transformEmpty),
    pores: yup.string().transform(transformEmpty),
    problems: yup
        .object({
            eyeshadowCrease: yup.boolean(),
            eyeshadowMatch: yup.boolean(),
            foundationPores: yup.boolean(),
            foundationStay: yup.boolean(),
            mascaraSmudge: yup.boolean(),
            other: yup.string(),
            sculpting: yup.boolean(),
        })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    procedures: yup
        .object({
            browCorrection: yup.boolean(),
            lashExtensions: yup.boolean(),
            lashLamination: yup.boolean(),
            none: yup.boolean(),
        })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    referral: yup.string().transform(transformEmpty),
    skinType: yup.string().transform(transformEmpty),
})
