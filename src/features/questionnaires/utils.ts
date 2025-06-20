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
        label: 'questions.name.label',
    },
    instagram: {
        label: 'questions.instagram.label',
        description: 'questions.instagram.description',
    },
    city: {
        label: 'questions.city.label',
        description: 'questions.city.description',
    },
    age: {
        label: 'questions.age.label',
    },
    makeupBag: {
        label: 'questions.makeupBag.label',
        description: 'questions.makeupBag.description',
    },
    makeupBagPhotoId: {
        label: 'questions.makeupBagPhotoId.label',
    },
    makeupBagPhotoUrl: {
        label: 'questions.makeupBagPhotoUrl.label',
    },
    procedures: {
        label: 'questions.procedures.label',
        description: 'questions.procedures.description',
        options: [
            {
                label: 'questions.procedures.options.lashExtensions',
                value: 'lashExtensions',
            },
            {
                label: 'questions.procedures.options.browCorrection',
                value: 'browCorrection',
            },
            {
                label: 'questions.procedures.options.lashLamination',
                value: 'lashLamination',
            },
            {
                label: 'questions.procedures.options.none',
                value: 'none',
            },
        ],
    },
    skinType: {
        label: 'questions.skinType.label',
        options: [
            {
                label: 'questions.skinType.options.dry',
                value: 'dry',
            },
            {
                label: 'questions.skinType.options.normal',
                value: 'normal',
            },
            {
                label: 'questions.skinType.options.combination',
                value: 'combination',
            },
            {
                label: 'questions.skinType.options.oily',
                value: 'oily',
            },
            {
                label: 'questions.skinType.options.sensitive',
                value: 'sensitive',
            },
        ],
    },
    allergies: {
        label: 'questions.allergies.label',
        description: 'questions.allergies.description',
    },
    peeling: {
        label: 'questions.peeling.label',
        description: 'questions.peeling.description',
        options: [
            {
                label: 'questions.peeling.options.yes',
                value: 'yes',
            },
            {
                label: 'questions.peeling.options.no',
                value: 'no',
            },
        ],
    },
    pores: {
        label: 'questions.pores.label',
        description: 'questions.pores.description',
        options: [
            {
                label: 'questions.pores.options.yes',
                value: 'yes',
            },
            {
                label: 'questions.pores.options.no',
                value: 'no',
            },
        ],
    },
    oilyShine: {
        label: 'questions.oilyShine.label',
        description: 'questions.oilyShine.description',
        options: [
            {
                label: 'questions.oilyShine.options.yes',
                value: 'yes',
            },
            {
                label: 'questions.oilyShine.options.no',
                value: 'no',
            },
        ],
    },
    currentSkills: {
        label: 'questions.currentSkills.label',
        description: 'questions.currentSkills.description',
    },
    desiredSkills: {
        label: 'questions.desiredSkills.label',
        description: 'questions.desiredSkills.description',
        options: [
            {
                label: 'questions.desiredSkills.options.delicate',
                value: 'delicate',
            },
            {
                label: 'questions.desiredSkills.options.evening',
                value: 'evening',
            },
            {
                label: 'questions.desiredSkills.options.bright',
                value: 'bright',
            },
            {
                label: 'questions.desiredSkills.options.office',
                value: 'office',
            },
            {
                label: 'questions.desiredSkills.options.filming',
                value: 'filming',
            },
        ],
    },
    makeupTime: {
        label: 'questions.makeupTime.label',
        description: 'questions.makeupTime.description',
        options: [
            {
                label: 'questions.makeupTime.options.15',
                value: '15',
            },
            {
                label: 'questions.makeupTime.options.15-30',
                value: '15-30',
            },
            {
                label: 'questions.makeupTime.options.30-60',
                value: '30-60',
            },
        ],
    },
    budget: {
        label: 'questions.budget.label',
        description: 'questions.budget.description',
        options: [
            {
                label: 'questions.budget.options.50',
                value: '50',
            },
            {
                label: 'questions.budget.options.150',
                value: '150',
            },
            {
                label: 'questions.budget.options.50-100',
                value: '50-100',
            },
            {
                label: 'questions.budget.options.150-250',
                value: '150-250',
            },
            {
                label: 'questions.budget.options.100',
                value: '100',
            },
            {
                label: 'questions.budget.options.250',
                value: '250',
            },
        ],
    },
    brushes: {
        label: 'questions.brushes.label',
        description: 'questions.brushes.description',
        options: [
            {
                label: 'questions.brushes.options.yes',
                value: 'yes',
            },
            {
                label: 'questions.brushes.options.no',
                value: 'no',
            },
        ],
    },
    problems: {
        label: 'questions.problems.label',
        description: 'questions.problems.description',
        options: [
            {
                label: 'questions.problems.options.eyeshadowCrease',
                value: 'eyeshadowCrease',
            },
            {
                label: 'questions.problems.options.mascaraSmudge',
                value: 'mascaraSmudge',
            },
            {
                label: 'questions.problems.options.foundationPores',
                value: 'foundationPores',
            },
            {
                label: 'questions.problems.options.foundationStay',
                value: 'foundationStay',
            },
            {
                label: 'questions.problems.options.sculpting',
                value: 'sculpting',
            },
            {
                label: 'questions.problems.options.eyeshadowMatch',
                value: 'eyeshadowMatch',
            },
        ],
    },
    referral: {
        label: 'questions.referral.label',
        description: 'questions.referral.description',
        options: [
            {
                label: 'questions.referral.options.instagram',
                value: 'instagram',
            },
            {
                label: 'questions.referral.options.youtube',
                value: 'youtube',
            },
            {
                label: 'questions.referral.options.personal',
                value: 'personal',
            },
            {
                label: 'questions.referral.options.recommendation',
                value: 'recommendation',
            },
            {
                label: 'questions.referral.options.other',
                value: 'other',
            },
        ],
    },
}
