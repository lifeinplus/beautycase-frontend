import * as yup from 'yup'

const transformEmpty = (value: any, originalValue: any) => {
    return originalValue === '' || originalValue === null ? undefined : value
}

export const schema = yup.object({
    name: yup.string().required('Укажите ваше имя'),
    instagram: yup.string().required('Укажите псевдоним в Instagram'),
    city: yup.string(),
    age: yup.number().transform(transformEmpty),
    makeupBag: yup.string().required('Укажите, что сейчас есть в косметичке'),
    procedures: yup.object({
        lashExtensions: yup.boolean(),
        browCorrection: yup.boolean(),
        lashLamination: yup.boolean(),
        none: yup.boolean(),
    }),
    skinType: yup.string().transform(transformEmpty),
    allergies: yup.string(),
    peeling: yup.string().transform(transformEmpty),
    pores: yup.boolean().transform(transformEmpty),
    oilyShine: yup.boolean().transform(transformEmpty),
    currentSkills: yup.string(),
    desiredSkills: yup.object({
        delicate: yup.boolean(),
        evening: yup.boolean(),
        bright: yup.boolean(),
        office: yup.boolean(),
    }),
    makeupTime: yup.string().transform(transformEmpty),
    budget: yup.string().transform(transformEmpty),
    brushes: yup.boolean().transform(transformEmpty),
    problems: yup.object({
        eyeshadowCrease: yup.boolean(),
        mascaraSmudge: yup.boolean(),
        foundationPores: yup.boolean(),
        foundationStay: yup.boolean(),
        sculpting: yup.boolean(),
        eyeshadowMatch: yup.boolean(),
        other: yup.string(),
    }),
    referral: yup.string().transform(transformEmpty),
})
