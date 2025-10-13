import { MakeupBagQuestionnaire, Questions } from '../../types'

export const makeupBagQuestionnaireQuestions: Questions<MakeupBagQuestionnaire> =
    {
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
                    id: 'procedure-lash-extensions',
                    label: 'makeupBag.fields.procedures.options.lashExtensions',
                    name: 'procedures.lashExtensions',
                    value: 'lashExtensions',
                },
                {
                    id: 'procedure-brow-correction',
                    label: 'makeupBag.fields.procedures.options.browCorrection',
                    name: 'procedures.browCorrection',
                    value: 'browCorrection',
                },
                {
                    id: 'procedure-lash-lamination',
                    label: 'makeupBag.fields.procedures.options.lashLamination',
                    name: 'procedures.lashLamination',
                    value: 'lashLamination',
                },
                {
                    id: 'procedure-none',
                    label: 'makeupBag.fields.procedures.options.none',
                    name: 'procedures.none',
                    value: 'none',
                },
            ],
        },
        skinType: {
            label: 'makeupBag.fields.skinType.label',
            options: [
                {
                    id: 'skin-type-dry',
                    label: 'makeupBag.fields.skinType.options.dry',
                    name: 'skinType',
                    value: 'dry',
                },
                {
                    id: 'skin-type-normal',
                    label: 'makeupBag.fields.skinType.options.normal',
                    name: 'skinType',
                    value: 'normal',
                },
                {
                    id: 'skin-type-combination',
                    label: 'makeupBag.fields.skinType.options.combination',
                    name: 'skinType',
                    value: 'combination',
                },
                {
                    id: 'skin-type-oily',
                    label: 'makeupBag.fields.skinType.options.oily',
                    name: 'skinType',
                    value: 'oily',
                },
                {
                    id: 'skin-type-sensitive',
                    label: 'makeupBag.fields.skinType.options.sensitive',
                    name: 'skinType',
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
                    id: 'peeling-yes',
                    label: 'makeupBag.fields.peeling.options.yes',
                    name: 'peeling',
                    value: 'yes',
                },
                {
                    id: 'peeling-no',
                    label: 'makeupBag.fields.peeling.options.no',
                    name: 'peeling',
                    value: 'no',
                },
            ],
        },
        pores: {
            label: 'makeupBag.fields.pores.label',
            description: 'makeupBag.fields.pores.description',
            options: [
                {
                    id: 'pores-yes',
                    label: 'makeupBag.fields.pores.options.yes',
                    name: 'pores',
                    value: 'yes',
                },
                {
                    id: 'pores-no',
                    label: 'makeupBag.fields.pores.options.no',
                    name: 'pores',
                    value: 'no',
                },
            ],
        },
        oilyShine: {
            label: 'makeupBag.fields.oilyShine.label',
            description: 'makeupBag.fields.oilyShine.description',
            options: [
                {
                    id: 'oily-shine-yes',
                    label: 'makeupBag.fields.oilyShine.options.yes',
                    name: 'oilyShine',
                    value: 'yes',
                },
                {
                    id: 'oily-shine-no',
                    label: 'makeupBag.fields.oilyShine.options.no',
                    name: 'oilyShine',
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
                    id: 'desired-skill-delicate',
                    label: 'makeupBag.fields.desiredSkills.options.delicate',
                    name: 'desiredSkills.delicate',
                    value: 'delicate',
                },
                {
                    id: 'desired-skill-evening',
                    label: 'makeupBag.fields.desiredSkills.options.evening',
                    name: 'desiredSkills.evening',
                    value: 'evening',
                },
                {
                    id: 'desired-skill-bright',
                    label: 'makeupBag.fields.desiredSkills.options.bright',
                    name: 'desiredSkills.bright',
                    value: 'bright',
                },
                {
                    id: 'desired-skill-office',
                    label: 'makeupBag.fields.desiredSkills.options.office',
                    name: 'desiredSkills.office',
                    value: 'office',
                },
                {
                    id: 'desired-skill-filming',
                    label: 'makeupBag.fields.desiredSkills.options.filming',
                    name: 'desiredSkills.filming',
                    value: 'filming',
                },
            ],
        },
        makeupTime: {
            label: 'makeupBag.fields.makeupTime.label',
            description: 'makeupBag.fields.makeupTime.description',
            options: [
                {
                    id: 'makeup-time-up-to-15-min',
                    label: 'makeupBag.fields.makeupTime.options.15',
                    name: 'makeupTime',
                    value: '15',
                },
                {
                    id: 'makeup-time-15-30-min',
                    label: 'makeupBag.fields.makeupTime.options.15-30',
                    name: 'makeupTime',
                    value: '15-30',
                },
                {
                    id: 'makeup-time-30-60-min',
                    label: 'makeupBag.fields.makeupTime.options.30-60',
                    name: 'makeupTime',
                    value: '30-60',
                },
            ],
        },
        budget: {
            label: 'makeupBag.fields.budget.label',
            description: 'makeupBag.fields.budget.description',
            options: [
                // {
                //     id: 'budget-up-to-50',
                //     label: 'makeupBag.fields.budget.options.50',
                //     name: 'budget',
                //     value: '50',
                // },
                // {
                //     id: 'budget-50-100',
                //     label: 'makeupBag.fields.budget.options.50-100',
                //     name: 'budget',
                //     value: '50-100',
                // },
                // {
                //     id: 'budget-more-than-100',
                //     label: 'makeupBag.fields.budget.options.100',
                //     name: 'budget',
                //     value: '100',
                // },
                {
                    id: 'budget-up-to-150',
                    label: 'makeupBag.fields.budget.options.150',
                    name: 'budget',
                    value: '150',
                },
                {
                    id: 'budget-150-250',
                    label: 'makeupBag.fields.budget.options.150-250',
                    name: 'budget',
                    value: '150-250',
                },
                {
                    id: 'budget-more-than-250',
                    label: 'makeupBag.fields.budget.options.250',
                    name: 'budget',
                    value: '250',
                },
            ],
        },
        brushes: {
            label: 'makeupBag.fields.brushes.label',
            description: 'makeupBag.fields.brushes.description',
            options: [
                {
                    id: 'brushes-yes',
                    label: 'makeupBag.fields.brushes.options.yes',
                    name: 'brushes',
                    value: 'yes',
                },
                {
                    id: 'brushes-no',
                    label: 'makeupBag.fields.brushes.options.no',
                    name: 'brushes',
                    value: 'no',
                },
            ],
        },
        problems: {
            label: 'makeupBag.fields.problems.label',
            description: 'makeupBag.fields.problems.description',
            options: [
                {
                    id: 'problem-eyeshadow-crease',
                    label: 'makeupBag.fields.problems.options.eyeshadowCrease',
                    name: 'problems.eyeshadowCrease',
                    value: 'eyeshadowCrease',
                },
                {
                    id: 'problem-mascara-smudge',
                    label: 'makeupBag.fields.problems.options.mascaraSmudge',
                    name: 'problems.mascaraSmudge',
                    value: 'mascaraSmudge',
                },
                {
                    id: 'problem-foundation-pores',
                    label: 'makeupBag.fields.problems.options.foundationPores',
                    name: 'problems.foundationPores',
                    value: 'foundationPores',
                },
                {
                    id: 'problem-foundation-stay',
                    label: 'makeupBag.fields.problems.options.foundationStay',
                    name: 'problems.foundationStay',
                    value: 'foundationStay',
                },
                {
                    id: 'problem-sculpting',
                    label: 'makeupBag.fields.problems.options.sculpting',
                    name: 'problems.sculpting',
                    value: 'sculpting',
                },
                {
                    id: 'problem-eyeshadow-match',
                    label: 'makeupBag.fields.problems.options.eyeshadowMatch',
                    name: 'problems.eyeshadowMatch',
                    value: 'eyeshadowMatch',
                },
            ],
        },
        referral: {
            label: 'makeupBag.fields.referral.label',
            description: 'makeupBag.fields.referral.description',
            options: [
                {
                    id: 'referral-instagram',
                    label: 'makeupBag.fields.referral.options.instagram',
                    name: 'referral',
                    value: 'instagram',
                },
                {
                    id: 'referral-youtube',
                    label: 'makeupBag.fields.referral.options.youtube',
                    name: 'referral',
                    value: 'youtube',
                },
                {
                    id: 'referral-personal',
                    label: 'makeupBag.fields.referral.options.personal',
                    name: 'referral',
                    value: 'personal',
                },
                {
                    id: 'referral-recommendation',
                    label: 'makeupBag.fields.referral.options.recommendation',
                    name: 'referral',
                    value: 'recommendation',
                },
                {
                    id: 'referral-other',
                    label: 'makeupBag.fields.referral.options.other',
                    name: 'referral',
                    value: 'other',
                },
            ],
        },
    }
