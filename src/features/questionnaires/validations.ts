import { boolean, number, object, string } from 'yup'

const transformAllFalse = (value: any) => {
    return value && Object.values(value).every((v) => v === false)
        ? undefined
        : value
}

const transformEmpty = (value: any, originalValue: any) => {
    return originalValue === '' || originalValue === null ? undefined : value
}

export const questionnaireSchema = object({
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
    makeupTime: string().transform(transformEmpty),
    name: string().required('Укажите ваше имя'),
    oilyShine: string().transform(transformEmpty),
    peeling: string().transform(transformEmpty),
    pores: string().transform(transformEmpty),
    problems: object({
        eyeshadowCrease: boolean(),
        mascaraSmudge: boolean(),
        foundationPores: boolean(),
        foundationStay: boolean(),
        sculpting: boolean(),
        eyeshadowMatch: boolean(),
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
