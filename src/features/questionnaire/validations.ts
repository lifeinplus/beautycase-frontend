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
    name: yup.string().required('Укажите ваше имя'),
    instagram: yup.string().required('Укажите псевдоним в Instagram'),
    city: yup.string().transform(transformEmpty),
    age: yup.number().transform(transformEmpty),
    makeupBag: yup.string().required('Укажите, что сейчас есть в косметичке'),
    procedures: yup
        .object({
            lashExtensions: yup.boolean(),
            browCorrection: yup.boolean(),
            lashLamination: yup.boolean(),
            none: yup.boolean(),
        })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    skinType: yup.string().transform(transformEmpty),
    allergies: yup.string().transform(transformEmpty),
    peeling: yup.string().transform(transformEmpty),
    pores: yup.string().transform(transformEmpty),
    oilyShine: yup.string().transform(transformEmpty),
    currentSkills: yup.string().transform(transformEmpty),
    desiredSkills: yup
        .object({
            delicate: yup.boolean(),
            evening: yup.boolean(),
            bright: yup.boolean(),
            office: yup.boolean(),
        })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    makeupTime: yup.string().transform(transformEmpty),
    budget: yup.string().transform(transformEmpty),
    brushes: yup.string().transform(transformEmpty),
    problems: yup
        .object({
            eyeshadowCrease: yup.boolean(),
            mascaraSmudge: yup.boolean(),
            foundationPores: yup.boolean(),
            foundationStay: yup.boolean(),
            sculpting: yup.boolean(),
            eyeshadowMatch: yup.boolean(),
            other: yup.string(),
        })
        .transform(transformAllFalse)
        .optional()
        .default(undefined),
    referral: yup.string().transform(transformEmpty),
})
