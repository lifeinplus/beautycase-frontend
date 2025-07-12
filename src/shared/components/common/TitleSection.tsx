import classNames from 'classnames'
import styles from './TitleSection.module.css'

export interface TitleSectionProps {
    title?: string
    subtitle?: string
    hideOnMobile?: boolean
}

export const TitleSection = ({
    title,
    subtitle,
    hideOnMobile,
}: TitleSectionProps) => (
    <section
        className={classNames(
            styles.container,
            hideOnMobile && 'hidden sm:block'
        )}
    >
        <h1 className={styles.headline}>{title}</h1>
        <p className={styles.byline}>{subtitle}</p>
    </section>
)
