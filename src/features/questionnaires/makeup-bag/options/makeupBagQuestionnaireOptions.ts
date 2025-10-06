import type { MakeupBagQuestionnaire, QuestionnaireOption } from '../../types'

type MakeupBagQuestionnaireOptions = Record<
    string,
    QuestionnaireOption<MakeupBagQuestionnaire>[]
>

export const makeupBagQuestionnaireOptions: MakeupBagQuestionnaireOptions = {
    // TODO: why two places for options? (2)
    brushes: [
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
    budget: [
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
    desiredSkills: [
        {
            id: 'desired-skill-delicate',
            label: 'makeupBag.fields.desiredSkills.options.delicate',
            name: 'desiredSkills.delicate',
        },
        {
            id: 'desired-skill-evening',
            label: 'makeupBag.fields.desiredSkills.options.evening',
            name: 'desiredSkills.evening',
        },
        {
            id: 'desired-skill-bright',
            label: 'makeupBag.fields.desiredSkills.options.bright',
            name: 'desiredSkills.bright',
        },
        {
            id: 'desired-skill-office',
            label: 'makeupBag.fields.desiredSkills.options.office',
            name: 'desiredSkills.office',
        },
        {
            id: 'desired-skill-filming',
            label: 'makeupBag.fields.desiredSkills.options.filming',
            name: 'desiredSkills.filming',
        },
    ],
    makeupTime: [
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
    oilyShine: [
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
    peeling: [
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
    pores: [
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
    problems: [
        {
            id: 'problem-eyeshadow-crease',
            label: 'makeupBag.fields.problems.options.eyeshadowCrease',
            name: 'problems.eyeshadowCrease',
        },
        {
            id: 'problem-mascara-smudge',
            label: 'makeupBag.fields.problems.options.mascaraSmudge',
            name: 'problems.mascaraSmudge',
        },
        {
            id: 'problem-foundation-pores',
            label: 'makeupBag.fields.problems.options.foundationPores',
            name: 'problems.foundationPores',
        },
        {
            id: 'problem-foundation-stay',
            label: 'makeupBag.fields.problems.options.foundationStay',
            name: 'problems.foundationStay',
        },
        {
            id: 'problem-sculpting',
            label: 'makeupBag.fields.problems.options.sculpting',
            name: 'problems.sculpting',
        },
        {
            id: 'problem-eyeshadow-match',
            label: 'makeupBag.fields.problems.options.eyeshadowMatch',
            name: 'problems.eyeshadowMatch',
        },
    ],
    procedures: [
        {
            id: 'procedure-lash-extensions',
            label: 'makeupBag.fields.procedures.options.lashExtensions',
            name: 'procedures.lashExtensions',
        },
        {
            id: 'procedure-brow-correction',
            label: 'makeupBag.fields.procedures.options.browCorrection',
            name: 'procedures.browCorrection',
        },
        {
            id: 'procedure-lash-lamination',
            label: 'makeupBag.fields.procedures.options.lashLamination',
            name: 'procedures.lashLamination',
        },
        {
            id: 'procedure-none',
            label: 'makeupBag.fields.procedures.options.none',
            name: 'procedures.none',
        },
    ],
    referral: [
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
    skinTypes: [
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
}
