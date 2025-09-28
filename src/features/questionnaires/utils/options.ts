import { Path } from 'react-hook-form'

import type { Questionnaire, Training } from '../types'

export interface QuestionnaireOption {
    id: string
    label: string
    name: Path<Questionnaire | Training>
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

interface TrainingOptions {
    experience: QuestionnaireOption[]
}

export const options: Options = {
    brushes: [
        {
            id: 'brushes-yes',
            label: 'fields.brushes.options.yes',
            name: 'brushes',
            value: 'yes',
        },
        {
            id: 'brushes-no',
            label: 'fields.brushes.options.no',
            name: 'brushes',
            value: 'no',
        },
    ],
    budget: [
        {
            id: 'budget-up-to-150',
            label: 'fields.budget.options.150',
            name: 'budget',
            value: '150',
        },
        {
            id: 'budget-150-250',
            label: 'fields.budget.options.150-250',
            name: 'budget',
            value: '150-250',
        },
        {
            id: 'budget-more-than-250',
            label: 'fields.budget.options.250',
            name: 'budget',
            value: '250',
        },
    ],
    desiredSkills: [
        {
            id: 'desired-skill-delicate',
            label: 'fields.desiredSkills.options.delicate',
            name: 'desiredSkills.delicate',
        },
        {
            id: 'desired-skill-evening',
            label: 'fields.desiredSkills.options.evening',
            name: 'desiredSkills.evening',
        },
        {
            id: 'desired-skill-bright',
            label: 'fields.desiredSkills.options.bright',
            name: 'desiredSkills.bright',
        },
        {
            id: 'desired-skill-office',
            label: 'fields.desiredSkills.options.office',
            name: 'desiredSkills.office',
        },
        {
            id: 'desired-skill-filming',
            label: 'fields.desiredSkills.options.filming',
            name: 'desiredSkills.filming',
        },
    ],
    makeupTime: [
        {
            id: 'makeup-time-up-to-15-min',
            label: 'fields.makeupTime.options.15',
            name: 'makeupTime',
            value: '15',
        },
        {
            id: 'makeup-time-15-30-min',
            label: 'fields.makeupTime.options.15-30',
            name: 'makeupTime',
            value: '15-30',
        },
        {
            id: 'makeup-time-30-60-min',
            label: 'fields.makeupTime.options.30-60',
            name: 'makeupTime',
            value: '30-60',
        },
    ],
    oilyShine: [
        {
            id: 'oily-shine-yes',
            label: 'fields.oilyShine.options.yes',
            name: 'oilyShine',
            value: 'yes',
        },
        {
            id: 'oily-shine-no',
            label: 'fields.oilyShine.options.no',
            name: 'oilyShine',
            value: 'no',
        },
    ],
    peeling: [
        {
            id: 'peeling-yes',
            label: 'fields.peeling.options.yes',
            name: 'peeling',
            value: 'yes',
        },
        {
            id: 'peeling-no',
            label: 'fields.peeling.options.no',
            name: 'peeling',
            value: 'no',
        },
    ],
    pores: [
        {
            id: 'pores-yes',
            label: 'fields.pores.options.yes',
            name: 'pores',
            value: 'yes',
        },
        {
            id: 'pores-no',
            label: 'fields.pores.options.no',
            name: 'pores',
            value: 'no',
        },
    ],
    problems: [
        {
            id: 'problem-eyeshadow-crease',
            label: 'fields.problems.options.eyeshadowCrease',
            name: 'problems.eyeshadowCrease',
        },
        {
            id: 'problem-mascara-smudge',
            label: 'fields.problems.options.mascaraSmudge',
            name: 'problems.mascaraSmudge',
        },
        {
            id: 'problem-foundation-pores',
            label: 'fields.problems.options.foundationPores',
            name: 'problems.foundationPores',
        },
        {
            id: 'problem-foundation-stay',
            label: 'fields.problems.options.foundationStay',
            name: 'problems.foundationStay',
        },
        {
            id: 'problem-sculpting',
            label: 'fields.problems.options.sculpting',
            name: 'problems.sculpting',
        },
        {
            id: 'problem-eyeshadow-match',
            label: 'fields.problems.options.eyeshadowMatch',
            name: 'problems.eyeshadowMatch',
        },
    ],
    procedures: [
        {
            id: 'procedure-lash-extensions',
            label: 'fields.procedures.options.lashExtensions',
            name: 'procedures.lashExtensions',
        },
        {
            id: 'procedure-brow-correction',
            label: 'fields.procedures.options.browCorrection',
            name: 'procedures.browCorrection',
        },
        {
            id: 'procedure-lash-lamination',
            label: 'fields.procedures.options.lashLamination',
            name: 'procedures.lashLamination',
        },
        {
            id: 'procedure-none',
            label: 'fields.procedures.options.none',
            name: 'procedures.none',
        },
    ],
    referral: [
        {
            id: 'referral-instagram',
            label: 'fields.referral.options.instagram',
            name: 'referral',
            value: 'instagram',
        },
        {
            id: 'referral-youtube',
            label: 'fields.referral.options.youtube',
            name: 'referral',
            value: 'youtube',
        },
        {
            id: 'referral-personal',
            label: 'fields.referral.options.personal',
            name: 'referral',
            value: 'personal',
        },
        {
            id: 'referral-recommendation',
            label: 'fields.referral.options.recommendation',
            name: 'referral',
            value: 'recommendation',
        },
        {
            id: 'referral-other',
            label: 'fields.referral.options.other',
            name: 'referral',
            value: 'other',
        },
    ],
    skinTypes: [
        {
            id: 'skin-type-dry',
            label: 'fields.skinType.options.dry',
            name: 'skinType',
            value: 'dry',
        },
        {
            id: 'skin-type-normal',
            label: 'fields.skinType.options.normal',
            name: 'skinType',
            value: 'normal',
        },
        {
            id: 'skin-type-combination',
            label: 'fields.skinType.options.combination',
            name: 'skinType',
            value: 'combination',
        },
        {
            id: 'skin-type-oily',
            label: 'fields.skinType.options.oily',
            name: 'skinType',
            value: 'oily',
        },
        {
            id: 'skin-type-sensitive',
            label: 'fields.skinType.options.sensitive',
            name: 'skinType',
            value: 'sensitive',
        },
    ],
}

export const trainingOptions: TrainingOptions = {
    experience: [
        {
            id: 'experience-no',
            label: 'training.fields.experience.options.no',
            name: 'experience',
            value: 'no',
        },
        {
            id: 'experience-yes-myself',
            label: 'training.fields.experience.options.yesMyself',
            name: 'experience',
            value: 'yesMyself',
        },
        {
            id: 'experience-yes-courses',
            label: 'training.fields.experience.options.yesCourses',
            name: 'experience',
            value: 'yesCourses',
        },
    ],
}
