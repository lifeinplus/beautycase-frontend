import { Path } from 'react-hook-form'

import type { Questionnaire } from './types'

export interface QuestionnaireOption {
    id: string
    label: string
    name: Path<Questionnaire>
    value?: string
}

export interface QuestionnaireResultOption {
    label: string
    value: string
}

interface Options {
    budget: QuestionnaireOption[]
    brushes: QuestionnaireOption[]
    desiredSkills: QuestionnaireOption[]
    makeupTime: QuestionnaireOption[]
    oilyShine: QuestionnaireOption[]
    peeling: QuestionnaireOption[]
    pores: QuestionnaireOption[]
    problems: QuestionnaireOption[]
    procedures: QuestionnaireOption[]
    referral: QuestionnaireOption[]
    skinTypes: QuestionnaireOption[]
}

export const options: Options = {
    brushes: [
        {
            id: 'brushes-yes',
            label: 'questions.brushes.options.yes',
            name: 'brushes',
            value: 'yes',
        },
        {
            id: 'brushes-no',
            label: 'questions.brushes.options.no',
            name: 'brushes',
            value: 'no',
        },
    ],
    budget: [
        {
            id: 'budget-up-to-150',
            label: 'questions.budget.options.150',
            name: 'budget',
            value: '150',
        },
        {
            id: 'budget-150-250',
            label: 'questions.budget.options.150-250',
            name: 'budget',
            value: '150-250',
        },
        {
            id: 'budget-more-than-250',
            label: 'questions.budget.options.250',
            name: 'budget',
            value: '250',
        },
    ],
    desiredSkills: [
        {
            id: 'desired-skill-delicate',
            label: 'questions.desiredSkills.options.delicate',
            name: 'desiredSkills.delicate',
        },
        {
            id: 'desired-skill-evening',
            label: 'questions.desiredSkills.options.evening',
            name: 'desiredSkills.evening',
        },
        {
            id: 'desired-skill-bright',
            label: 'questions.desiredSkills.options.bright',
            name: 'desiredSkills.bright',
        },
        {
            id: 'desired-skill-office',
            label: 'questions.desiredSkills.options.office',
            name: 'desiredSkills.office',
        },
        {
            id: 'desired-skill-filming',
            label: 'questions.desiredSkills.options.filming',
            name: 'desiredSkills.filming',
        },
    ],
    makeupTime: [
        {
            id: 'makeup-time-up-to-15-min',
            label: 'questions.makeupTime.options.15',
            name: 'makeupTime',
            value: '15',
        },
        {
            id: 'makeup-time-15-30-min',
            label: 'questions.makeupTime.options.15-30',
            name: 'makeupTime',
            value: '15-30',
        },
        {
            id: 'makeup-time-30-60-min',
            label: 'questions.makeupTime.options.30-60',
            name: 'makeupTime',
            value: '30-60',
        },
    ],
    oilyShine: [
        {
            id: 'oily-shine-yes',
            label: 'questions.oilyShine.options.yes',
            name: 'oilyShine',
            value: 'yes',
        },
        {
            id: 'oily-shine-no',
            label: 'questions.oilyShine.options.no',
            name: 'oilyShine',
            value: 'no',
        },
    ],
    peeling: [
        {
            id: 'peeling-yes',
            label: 'questions.peeling.options.yes',
            name: 'peeling',
            value: 'yes',
        },
        {
            id: 'peeling-no',
            label: 'questions.peeling.options.no',
            name: 'peeling',
            value: 'no',
        },
    ],
    pores: [
        {
            id: 'pores-yes',
            label: 'questions.pores.options.yes',
            name: 'pores',
            value: 'yes',
        },
        {
            id: 'pores-no',
            label: 'questions.pores.options.no',
            name: 'pores',
            value: 'no',
        },
    ],
    problems: [
        {
            id: 'problem-eyeshadow-crease',
            label: 'questions.problems.options.eyeshadowCrease',
            name: 'problems.eyeshadowCrease',
        },
        {
            id: 'problem-mascara-smudge',
            label: 'questions.problems.options.mascaraSmudge',
            name: 'problems.mascaraSmudge',
        },
        {
            id: 'problem-foundation-pores',
            label: 'questions.problems.options.foundationPores',
            name: 'problems.foundationPores',
        },
        {
            id: 'problem-foundation-stay',
            label: 'questions.problems.options.foundationStay',
            name: 'problems.foundationStay',
        },
        {
            id: 'problem-sculpting',
            label: 'questions.problems.options.sculpting',
            name: 'problems.sculpting',
        },
        {
            id: 'problem-eyeshadow-match',
            label: 'questions.problems.options.eyeshadowMatch',
            name: 'problems.eyeshadowMatch',
        },
    ],
    procedures: [
        {
            id: 'procedure-lash-extensions',
            label: 'questions.procedures.options.lashExtensions',
            name: 'procedures.lashExtensions',
        },
        {
            id: 'procedure-brow-correction',
            label: 'questions.procedures.options.browCorrection',
            name: 'procedures.browCorrection',
        },
        {
            id: 'procedure-lash-lamination',
            label: 'questions.procedures.options.lashLamination',
            name: 'procedures.lashLamination',
        },
        {
            id: 'procedure-none',
            label: 'questions.procedures.options.none',
            name: 'procedures.none',
        },
    ],
    referral: [
        {
            id: 'referral-instagram',
            label: 'questions.referral.options.instagram',
            name: 'referral',
            value: 'instagram',
        },
        {
            id: 'referral-youtube',
            label: 'questions.referral.options.youtube',
            name: 'referral',
            value: 'youtube',
        },
        {
            id: 'referral-personal',
            label: 'questions.referral.options.personal',
            name: 'referral',
            value: 'personal',
        },
        {
            id: 'referral-recommendation',
            label: 'questions.referral.options.recommendation',
            name: 'referral',
            value: 'recommendation',
        },
        {
            id: 'referral-other',
            label: 'questions.referral.options.other',
            name: 'referral',
            value: 'other',
        },
    ],
    skinTypes: [
        {
            id: 'skin-type-dry',
            label: 'questions.skinType.options.dry',
            name: 'skinType',
            value: 'dry',
        },
        {
            id: 'skin-type-normal',
            label: 'questions.skinType.options.normal',
            name: 'skinType',
            value: 'normal',
        },
        {
            id: 'skin-type-combination',
            label: 'questions.skinType.options.combination',
            name: 'skinType',
            value: 'combination',
        },
        {
            id: 'skin-type-oily',
            label: 'questions.skinType.options.oily',
            name: 'skinType',
            value: 'oily',
        },
        {
            id: 'skin-type-sensitive',
            label: 'questions.skinType.options.sensitive',
            name: 'skinType',
            value: 'sensitive',
        },
    ],
}
