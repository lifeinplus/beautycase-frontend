import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import styles from './QuestionnaireCard.module.css'

export interface QuestionnaireCardProps {
    type: string
    imageUrl: string
    title: string
}

export const QuestionnaireCard = ({
    type,
    imageUrl,
    title,
}: QuestionnaireCardProps) => {
    const { t } = useTranslation('questionnaire')

    return (
        <div>
            <Link
                key={type}
                to={`/questionnaires/${type}`}
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
                    to={`/questionnaires/results/${type}`}
                    className="flex gap-1 text-sm/6 font-semibold text-rose-400 hover:text-gray-100"
                >
                    {t('results')}
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </div>
    )
}
