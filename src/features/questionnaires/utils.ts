import { type QuestionnaireResultOption } from './options'

interface Question {
    description?: string
    label: string
    options?: QuestionnaireResultOption[]
}

interface Questions {
    [key: string]: Question
}

export const questions: Questions = {
    name: {
        label: 'fields.name.label',
    },
    instagram: {
        label: 'fields.instagram.label',
        description: 'fields.instagram.description',
    },
    city: {
        label: 'fields.city.label',
        description: 'fields.city.description',
    },
    age: {
        label: 'fields.age.label',
    },
    makeupBag: {
        label: 'fields.makeupBag.label',
        description: 'fields.makeupBag.description',
    },
    makeupBagPhotoId: {
        label: 'fields.makeupBagPhotoId.label',
    },
    makeupBagPhotoUrl: {
        label: 'fields.makeupBagPhotoUrl.label',
    },
    procedures: {
        label: 'fields.procedures.label',
        description: 'fields.procedures.description',
        options: [
            {
                label: 'fields.procedures.options.lashExtensions',
                value: 'lashExtensions',
            },
            {
                label: 'fields.procedures.options.browCorrection',
                value: 'browCorrection',
            },
            {
                label: 'fields.procedures.options.lashLamination',
                value: 'lashLamination',
            },
            {
                label: 'fields.procedures.options.none',
                value: 'none',
            },
        ],
    },
    skinType: {
        label: 'fields.skinType.label',
        options: [
            {
                label: 'fields.skinType.options.dry',
                value: 'dry',
            },
            {
                label: 'fields.skinType.options.normal',
                value: 'normal',
            },
            {
                label: 'fields.skinType.options.combination',
                value: 'combination',
            },
            {
                label: 'fields.skinType.options.oily',
                value: 'oily',
            },
            {
                label: 'fields.skinType.options.sensitive',
                value: 'sensitive',
            },
        ],
    },
    allergies: {
        label: 'fields.allergies.label',
        description: 'fields.allergies.description',
    },
    peeling: {
        label: 'fields.peeling.label',
        description: 'fields.peeling.description',
        options: [
            {
                label: 'fields.peeling.options.yes',
                value: 'yes',
            },
            {
                label: 'fields.peeling.options.no',
                value: 'no',
            },
        ],
    },
    pores: {
        label: 'fields.pores.label',
        description: 'fields.pores.description',
        options: [
            {
                label: 'fields.pores.options.yes',
                value: 'yes',
            },
            {
                label: 'fields.pores.options.no',
                value: 'no',
            },
        ],
    },
    oilyShine: {
        label: 'fields.oilyShine.label',
        description: 'fields.oilyShine.description',
        options: [
            {
                label: 'fields.oilyShine.options.yes',
                value: 'yes',
            },
            {
                label: 'fields.oilyShine.options.no',
                value: 'no',
            },
        ],
    },
    currentSkills: {
        label: 'fields.currentSkills.label',
        description: 'fields.currentSkills.description',
    },
    desiredSkills: {
        label: 'fields.desiredSkills.label',
        description: 'fields.desiredSkills.description',
        options: [
            {
                label: 'fields.desiredSkills.options.delicate',
                value: 'delicate',
            },
            {
                label: 'fields.desiredSkills.options.evening',
                value: 'evening',
            },
            {
                label: 'fields.desiredSkills.options.bright',
                value: 'bright',
            },
            {
                label: 'fields.desiredSkills.options.office',
                value: 'office',
            },
            {
                label: 'fields.desiredSkills.options.filming',
                value: 'filming',
            },
        ],
    },
    makeupTime: {
        label: 'fields.makeupTime.label',
        description: 'fields.makeupTime.description',
        options: [
            {
                label: 'fields.makeupTime.options.15',
                value: '15',
            },
            {
                label: 'fields.makeupTime.options.15-30',
                value: '15-30',
            },
            {
                label: 'fields.makeupTime.options.30-60',
                value: '30-60',
            },
        ],
    },
    budget: {
        label: 'fields.budget.label',
        description: 'fields.budget.description',
        options: [
            {
                label: 'fields.budget.options.50',
                value: '50',
            },
            {
                label: 'fields.budget.options.150',
                value: '150',
            },
            {
                label: 'fields.budget.options.50-100',
                value: '50-100',
            },
            {
                label: 'fields.budget.options.150-250',
                value: '150-250',
            },
            {
                label: 'fields.budget.options.100',
                value: '100',
            },
            {
                label: 'fields.budget.options.250',
                value: '250',
            },
        ],
    },
    brushes: {
        label: 'fields.brushes.label',
        description: 'fields.brushes.description',
        options: [
            {
                label: 'fields.brushes.options.yes',
                value: 'yes',
            },
            {
                label: 'fields.brushes.options.no',
                value: 'no',
            },
        ],
    },
    problems: {
        label: 'fields.problems.label',
        description: 'fields.problems.description',
        options: [
            {
                label: 'fields.problems.options.eyeshadowCrease',
                value: 'eyeshadowCrease',
            },
            {
                label: 'fields.problems.options.mascaraSmudge',
                value: 'mascaraSmudge',
            },
            {
                label: 'fields.problems.options.foundationPores',
                value: 'foundationPores',
            },
            {
                label: 'fields.problems.options.foundationStay',
                value: 'foundationStay',
            },
            {
                label: 'fields.problems.options.sculpting',
                value: 'sculpting',
            },
            {
                label: 'fields.problems.options.eyeshadowMatch',
                value: 'eyeshadowMatch',
            },
        ],
    },
    referral: {
        label: 'fields.referral.label',
        description: 'fields.referral.description',
        options: [
            {
                label: 'fields.referral.options.instagram',
                value: 'instagram',
            },
            {
                label: 'fields.referral.options.youtube',
                value: 'youtube',
            },
            {
                label: 'fields.referral.options.personal',
                value: 'personal',
            },
            {
                label: 'fields.referral.options.recommendation',
                value: 'recommendation',
            },
            {
                label: 'fields.referral.options.other',
                value: 'other',
            },
        ],
    },
}
