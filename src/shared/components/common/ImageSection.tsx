import classNames from 'classnames'

import { Image } from '@/shared/components/ui/Image'
import styles from './ImageSection.module.css'

export interface ImageSectionProps {
    name?: string
    url?: string
}

export const ImageSection = ({ name, url }: ImageSectionProps) => (
    <section className={styles.image}>
        <div className={classNames(styles.container, styles.rectangle)}>
            <Image alt={name} src={url} />
        </div>
    </section>
)
