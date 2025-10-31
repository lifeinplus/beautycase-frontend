import { boolean, number, object, string } from 'yup'

import { transformAllFalse, transformEmpty } from '../../utils'

export const makeupBagQuestionnaireSchema = object({
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
    makeupBag: string().required('makeupBag.fields.makeupBag.errors.required'),
    makeupTime: string().transform(transformEmpty),
    muaId: string().required('makeupBag.fields.mua.errors.required'),
    name: string().required('makeupBag.fields.name.errors.required'),
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
