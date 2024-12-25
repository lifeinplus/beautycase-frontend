import { Path } from 'react-hook-form'

import type { Questionnaire } from './types'

export interface QuestionnaireOption {
    id: string
    label: string
    name: Path<Questionnaire>
    value?: string
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
            label: 'Да',
            name: 'brushes',
            value: 'yes',
        },
        {
            id: 'brushes-no',
            label: 'Нет',
            name: 'brushes',
            value: 'no',
        },
    ],
    budget: [
        {
            id: 'budget-up-to-30-eur',
            label: 'До 30 евро',
            name: 'budget',
            value: '30',
        },
        {
            id: 'budget-30-50-eur',
            label: '30-50 евро',
            name: 'budget',
            value: '30-50',
        },
        {
            id: 'budget-50-100-eur',
            label: '50-100 евро',
            name: 'budget',
            value: '50-100',
        },
        {
            id: 'budget-more-than-100-eur',
            label: 'Более 100 евро',
            name: 'budget',
            value: '100',
        },
    ],
    desiredSkills: [
        {
            id: 'desired-skill-delicate',
            label: 'Нежный',
            name: 'desiredSkills.delicate',
        },
        {
            id: 'desired-skill-evening',
            label: 'Вечерний',
            name: 'desiredSkills.evening',
        },
        {
            id: 'desired-skill-bright',
            label: 'Яркий',
            name: 'desiredSkills.bright',
        },
        {
            id: 'desired-skill-office',
            label: 'Офисный вариант',
            name: 'desiredSkills.office',
        },
    ],
    makeupTime: [
        {
            id: 'makeup-time-up-to-15-min',
            label: 'До 15 минут',
            name: 'makeupTime',
            value: '15',
        },
        {
            id: 'makeup-time-15-30-min',
            label: '15-30 минут',
            name: 'makeupTime',
            value: '15-30',
        },
        {
            id: 'makeup-time-30-60-min',
            label: '30-60 минут',
            name: 'makeupTime',
            value: '30-60',
        },
    ],
    oilyShine: [
        {
            id: 'oily-shine-yes',
            label: 'Да',
            name: 'oilyShine',
            value: 'yes',
        },
        {
            id: 'oily-shine-no',
            label: 'Нет',
            name: 'oilyShine',
            value: 'no',
        },
    ],
    peeling: [
        {
            id: 'peeling-yes',
            label: 'Да',
            name: 'peeling',
            value: 'yes',
        },
        {
            id: 'peeling-no',
            label: 'Нет',
            name: 'peeling',
            value: 'no',
        },
    ],
    pores: [
        {
            id: 'pores-yes',
            label: 'Да',
            name: 'pores',
            value: 'yes',
        },
        {
            id: 'pores-no',
            label: 'Нет',
            name: 'pores',
            value: 'no',
        },
    ],
    problems: [
        {
            id: 'problem-eyeshadow-crease',
            label: 'Скатываются тени',
            name: 'problems.eyeshadowCrease',
        },
        {
            id: 'problem-mascara-smudge',
            label: 'Отпечатывается тушь',
            name: 'problems.mascaraSmudge',
        },
        {
            id: 'problem-foundation-pores',
            label: 'Тон проваливается в поры',
            name: 'problems.foundationPores',
        },
        {
            id: 'problem-foundation-stay',
            label: 'Тон плохо держится',
            name: 'problems.foundationStay',
        },
        {
            id: 'problem-sculpting',
            label: 'Не умею делать скульптурирование',
            name: 'problems.sculpting',
        },
        {
            id: 'problem-eyeshadow-match',
            label: 'Не знаю, какие тени подходят под мой цвет глаз',
            name: 'problems.eyeshadowMatch',
        },
    ],
    procedures: [
        {
            id: 'procedure-lash-extensions',
            label: 'Наращивание ресниц',
            name: 'procedures.lashExtensions',
        },
        {
            id: 'procedure-brow-correction',
            label: 'Коррекция и покраска бровей',
            name: 'procedures.browCorrection',
        },
        {
            id: 'procedure-lash-lamination',
            label: 'Ламинирование, покраска ресниц',
            name: 'procedures.lashLamination',
        },
        {
            id: 'procedure-none',
            label: 'Не делаю',
            name: 'procedures.none',
        },
    ],
    referral: [
        {
            id: 'referral-instagram',
            label: 'Instagram',
            name: 'referral',
            value: 'instagram',
        },
        {
            id: 'referral-youtube',
            label: 'YouTube',
            name: 'referral',
            value: 'youtube',
        },
        {
            id: 'referral-other',
            label: 'Другое',
            name: 'referral',
            value: 'other',
        },
    ],
    skinTypes: [
        {
            id: 'skin-type-normal',
            label: 'Нормальная',
            name: 'skinType',
            value: 'normal',
        },
        {
            id: 'skin-type-dry',
            label: 'Сухая',
            name: 'skinType',
            value: 'dry',
        },
        {
            id: 'skin-type-combination',
            label: 'Комбинированная',
            name: 'skinType',
            value: 'combination',
        },
        {
            id: 'skin-type-oily',
            label: 'Жирная',
            name: 'skinType',
            value: 'oily',
        },
    ],
}
