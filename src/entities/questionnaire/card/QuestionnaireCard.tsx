import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import styles from './QuestionnaireCard.module.css'

export interface QuestionnaireCardProps {
    title: string
    imageUrl: string
    createPath: string
    resultsPath: string
}

export const QuestionnaireCard = ({
    title,
    imageUrl,
    createPath,
    resultsPath,
}: QuestionnaireCardProps) => {
    const { t } = useTranslation('questionnaire')

    return (
        <div>
            <Link
                to={`/questionnaires/${createPath}`}
                className={styles.container}
            >
                <img src={imageUrl} alt={title} className={styles.image} />
                <div className={styles.background} />
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                </div>
            </Link>
            <div className="my-2 flex justify-end">
                <Link
                    to={`/questionnaires/${resultsPath}`}
                    className="flex gap-1 text-sm/6 font-semibold text-rose-400 hover:text-gray-100"
                >
                    {t('results')}
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </div>
    )
}
