import { Questions } from '../../types'

export const makeupBagQuestionnaireQuestions: Questions = {
    name: {
        label: 'makeupBag.fields.name.label',
    },
    instagram: {
        label: 'makeupBag.fields.instagram.label',
        description: 'makeupBag.fields.instagram.description',
    },
    city: {
        label: 'makeupBag.fields.city.label',
        description: 'makeupBag.fields.city.description',
    },
    age: {
        label: 'makeupBag.fields.age.label',
    },
    makeupBag: {
        label: 'makeupBag.fields.makeupBag.label',
        description: 'makeupBag.fields.makeupBag.description',
    },
    makeupBagPhotoId: {
        label: 'makeupBag.fields.makeupBagPhotoId.label',
    },
    makeupBagPhotoUrl: {
        label: 'makeupBag.fields.makeupBagPhotoUrl.label',
    },
    procedures: {
        label: 'makeupBag.fields.procedures.label',
        description: 'makeupBag.fields.procedures.description',
        options: [
            {
                label: 'makeupBag.fields.procedures.options.lashExtensions',
                value: 'lashExtensions',
            },
            {
                label: 'makeupBag.fields.procedures.options.browCorrection',
                value: 'browCorrection',
            },
            {
                label: 'makeupBag.fields.procedures.options.lashLamination',
                value: 'lashLamination',
            },
            {
                label: 'makeupBag.fields.procedures.options.none',
                value: 'none',
            },
        ],
    },
    skinType: {
        label: 'makeupBag.fields.skinType.label',
        options: [
            {
                label: 'makeupBag.fields.skinType.options.dry',
                value: 'dry',
            },
            {
                label: 'makeupBag.fields.skinType.options.normal',
                value: 'normal',
            },
            {
                label: 'makeupBag.fields.skinType.options.combination',
                value: 'combination',
            },
            {
                label: 'makeupBag.fields.skinType.options.oily',
                value: 'oily',
            },
            {
                label: 'makeupBag.fields.skinType.options.sensitive',
                value: 'sensitive',
            },
        ],
    },
    allergies: {
        label: 'makeupBag.fields.allergies.label',
        description: 'makeupBag.fields.allergies.description',
    },
    peeling: {
        label: 'makeupBag.fields.peeling.label',
        description: 'makeupBag.fields.peeling.description',
        options: [
            {
                label: 'makeupBag.fields.peeling.options.yes',
                value: 'yes',
            },
            {
                label: 'makeupBag.fields.peeling.options.no',
                value: 'no',
            },
        ],
    },
    pores: {
        label: 'makeupBag.fields.pores.label',
        description: 'makeupBag.fields.pores.description',
        options: [
            {
                label: 'makeupBag.fields.pores.options.yes',
                value: 'yes',
            },
            {
                label: 'makeupBag.fields.pores.options.no',
                value: 'no',
            },
        ],
    },
    oilyShine: {
        label: 'makeupBag.fields.oilyShine.label',
        description: 'makeupBag.fields.oilyShine.description',
        options: [
            {
                label: 'makeupBag.fields.oilyShine.options.yes',
                value: 'yes',
            },
            {
                label: 'makeupBag.fields.oilyShine.options.no',
                value: 'no',
            },
        ],
    },
    currentSkills: {
        label: 'makeupBag.fields.currentSkills.label',
        description: 'makeupBag.fields.currentSkills.description',
    },
    desiredSkills: {
        label: 'makeupBag.fields.desiredSkills.label',
        description: 'makeupBag.fields.desiredSkills.description',
        options: [
            {
                label: 'makeupBag.fields.desiredSkills.options.delicate',
                value: 'delicate',
            },
            {
                label: 'makeupBag.fields.desiredSkills.options.evening',
                value: 'evening',
            },
            {
                label: 'makeupBag.fields.desiredSkills.options.bright',
                value: 'bright',
            },
            {
                label: 'makeupBag.fields.desiredSkills.options.office',
                value: 'office',
            },
            {
                label: 'makeupBag.fields.desiredSkills.options.filming',
                value: 'filming',
            },
        ],
    },
    makeupTime: {
        label: 'makeupBag.fields.makeupTime.label',
        description: 'makeupBag.fields.makeupTime.description',
        options: [
            {
                label: 'makeupBag.fields.makeupTime.options.15',
                value: '15',
            },
            {
                label: 'makeupBag.fields.makeupTime.options.15-30',
                value: '15-30',
            },
            {
                label: 'makeupBag.fields.makeupTime.options.30-60',
                value: '30-60',
            },
        ],
    },
    budget: {
        label: 'makeupBag.fields.budget.label',
        description: 'makeupBag.fields.budget.description',
        options: [
            {
                label: 'makeupBag.fields.budget.options.50',
                value: '50',
            },
            {
                label: 'makeupBag.fields.budget.options.150',
                value: '150',
            },
            {
                label: 'makeupBag.fields.budget.options.50-100',
                value: '50-100',
            },
            {
                label: 'makeupBag.fields.budget.options.150-250',
                value: '150-250',
            },
            {
                label: 'makeupBag.fields.budget.options.100',
                value: '100',
            },
            {
                label: 'makeupBag.fields.budget.options.250',
                value: '250',
            },
        ],
    },
    // TODO: why two places for options? (1)
    brushes: {
        label: 'makeupBag.fields.brushes.label',
        description: 'makeupBag.fields.brushes.description',
        options: [
            {
                label: 'makeupBag.fields.brushes.options.yes',
                value: 'yes',
            },
            {
                label: 'makeupBag.fields.brushes.options.no',
                value: 'no',
            },
        ],
    },
    problems: {
        label: 'makeupBag.fields.problems.label',
        description: 'makeupBag.fields.problems.description',
        options: [
            {
                label: 'makeupBag.fields.problems.options.eyeshadowCrease',
                value: 'eyeshadowCrease',
            },
            {
                label: 'makeupBag.fields.problems.options.mascaraSmudge',
                value: 'mascaraSmudge',
            },
            {
                label: 'makeupBag.fields.problems.options.foundationPores',
                value: 'foundationPores',
            },
            {
                label: 'makeupBag.fields.problems.options.foundationStay',
                value: 'foundationStay',
            },
            {
                label: 'makeupBag.fields.problems.options.sculpting',
                value: 'sculpting',
            },
            {
                label: 'makeupBag.fields.problems.options.eyeshadowMatch',
                value: 'eyeshadowMatch',
            },
        ],
    },
    referral: {
        label: 'makeupBag.fields.referral.label',
        description: 'makeupBag.fields.referral.description',
        options: [
            {
                label: 'makeupBag.fields.referral.options.instagram',
                value: 'instagram',
            },
            {
                label: 'makeupBag.fields.referral.options.youtube',
                value: 'youtube',
            },
            {
                label: 'makeupBag.fields.referral.options.personal',
                value: 'personal',
            },
            {
                label: 'makeupBag.fields.referral.options.recommendation',
                value: 'recommendation',
            },
            {
                label: 'makeupBag.fields.referral.options.other',
                value: 'other',
            },
        ],
    },
}
