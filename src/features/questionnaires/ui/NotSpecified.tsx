import { useTranslation } from 'react-i18next'

export const NotSpecified = () => {
    const { t } = useTranslation(['questionnaire'])

    return (
        <span className="text-neutral-400 dark:text-neutral-500">
            {t('notSpecified')}
        </span>
    )
}
