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
        label: 'Имя',
    },
    instagram: {
        label: 'Instagram',
        description: 'Псевдоним в Instagram',
    },
    city: {
        label: 'Город',
        description: 'Город проживания',
    },
    age: {
        label: 'Возраст',
    },
    makeupBag: {
        label: 'Содержимое косметички',
        description: 'Опишите свою косметичку и/или приложите фото',
    },
    makeupBagPhotoId: {
        label: 'Фото косметички',
    },
    makeupBagPhotoUrl: {
        label: 'Ссылка на изображение косметички',
    },
    procedures: {
        label: 'Процедуры',
        description:
            'Делаете ли какие-то из этих процедур на постоянной основе?',
        options: [
            {
                label: 'Наращивание ресниц',
                value: 'lashExtensions',
            },
            {
                label: 'Коррекция и покраска бровей',
                value: 'browCorrection',
            },
            {
                label: 'Ламинирование, покраска ресниц',
                value: 'lashLamination',
            },
            {
                label: 'Не делаю',
                value: 'none',
            },
        ],
    },
    skinType: {
        label: 'Тип кожи',
        options: [
            {
                label: 'Сухая',
                value: 'dry',
            },
            {
                label: 'Нормальная',
                value: 'normal',
            },
            {
                label: 'Комбинированная',
                value: 'combination',
            },
            {
                label: 'Жирная',
                value: 'oily',
            },
            {
                label: 'Чувствительная',
                value: 'sensitive',
            },
        ],
    },
    allergies: {
        label: 'Аллергии',
        description: 'Есть ли аллергии? На что, если есть?',
    },
    peeling: {
        label: 'Шелушения',
        description: 'Бывают ли шелушения?',
        options: [
            {
                label: 'Да',
                value: 'yes',
            },
            {
                label: 'Нет',
                value: 'no',
            },
        ],
    },
    pores: {
        label: 'Поры',
        description: 'Заметны ли поры?',
        options: [
            {
                label: 'Да',
                value: 'yes',
            },
            {
                label: 'Нет',
                value: 'no',
            },
        ],
    },
    oilyShine: {
        label: 'Жирный блеск',
        description: 'Появляется ли жирный блеск в течение дня?',
        options: [
            {
                label: 'Да',
                value: 'yes',
            },
            {
                label: 'Нет',
                value: 'no',
            },
        ],
    },
    currentSkills: {
        label: 'Текущие навыки',
        description: 'Что уже умеете? Какие виды макияжа делаете сейчас?',
    },
    desiredSkills: {
        label: 'Желаемые навыки',
        description: 'Какие виды макияжа хотите научиться делать в будущем?',
        options: [
            {
                label: 'Нежный',
                value: 'delicate',
            },
            {
                label: 'Вечерний',
                value: 'evening',
            },
            {
                label: 'Яркий',
                value: 'bright',
            },
            {
                label: 'Офисный вариант',
                value: 'office',
            },
            {
                label: 'Для фото/видео съёмок',
                value: 'filming',
            },
        ],
    },
    makeupTime: {
        label: 'Время на макияж',
        description: 'Сколько времени чаще всего выделяете на макияж?',
        options: [
            {
                label: 'До 15 минут',
                value: '15',
            },
            {
                label: '15-30 минут',
                value: '15-30',
            },
            {
                label: '30-60 минут',
                value: '30-60',
            },
        ],
    },
    budget: {
        label: 'Бюджет',
        description: 'Какой бюджет закладываете на косметичку?',
        options: [
            {
                label: 'До 50 евро',
                value: '50',
            },
            {
                label: '50-100 евро',
                value: '50-100',
            },
            {
                label: 'Более 100 евро',
                value: '100',
            },
        ],
    },
    brushes: {
        label: 'Подбор кистей',
        description: 'Нужен ли подбор кистей?',
        options: [
            {
                label: 'Да',
                value: 'yes',
            },
            {
                label: 'Нет',
                value: 'no',
            },
        ],
    },
    problems: {
        label: 'Проблемы при макияже',
        description: 'С какими проблемами сталкивались при выполнении макияжа?',
        options: [
            {
                label: 'Скатываются тени',
                value: 'eyeshadowCrease',
            },
            {
                label: 'Отпечатывается тушь',
                value: 'mascaraSmudge',
            },
            {
                label: 'Тон проваливается в поры',
                value: 'foundationPores',
            },
            {
                label: 'Тон плохо держится',
                value: 'foundationStay',
            },
            {
                label: 'Не умею делать скульптурирование',
                value: 'sculpting',
            },
            {
                label: 'Не знаю, какие тени подходят под мой цвет глаз',
                value: 'eyeshadowMatch',
            },
        ],
    },
    referral: {
        label: 'Источник',
        description: 'Откуда узнали про меня?',
        options: [
            {
                label: 'Instagram',
                value: 'instagram',
            },
            {
                label: 'YouTube',
                value: 'youtube',
            },
            {
                label: 'Личное знакомство',
                value: 'personal',
            },
            {
                label: 'По рекомендации',
                value: 'recommendation',
            },
            {
                label: 'Другое',
                value: 'other',
            },
        ],
    },
}
