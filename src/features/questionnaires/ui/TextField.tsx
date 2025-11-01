import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { QuestionnaireOption } from '../types'
import { NotSpecified } from './NotSpecified'

interface TextFieldProps<T extends FieldValues> {
    value: T[keyof T]
    options?: QuestionnaireOption<T>[]
}

export const TextField = <T extends FieldValues>({
    value,
    options,
}: TextFieldProps<T>) => {
    const { t } = useTranslation('questionnaire')

    if (!value || (Array.isArray(value) && value.length === 0)) {
        return <NotSpecified />
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
        const selectedKeys = Object.entries(value)
            .filter(([_, v]) => Boolean(v))
            .map(([k]) => k)

        if (selectedKeys.length === 0) return <NotSpecified />

        const translated = selectedKeys
            .map((key) =>
                t(options?.find((o) => o.value === key)?.label || key)
            )
            .join(' • ')

        return translated || <NotSpecified />
    }

    const stringValue = Array.isArray(value)
        ? value.join(' • ')
        : value.toString()

    const translated =
        options?.find((o) => o.value === value)?.label || stringValue

    return translated ? t(translated) : <NotSpecified />
}
