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
        className={classNames(styles.title, hideOnMobile && 'hidden sm:block')}
    >
        {title && <h1 className={styles.headline}>{title}</h1>}
        {subtitle && <p className={styles.byline}>{subtitle}</p>}
    </section>
)
