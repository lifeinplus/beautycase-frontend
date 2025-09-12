import classNames from 'classnames'
import { Image } from '../../ui/image/Image'
import styles from './Hero.module.css'

export interface HeroProps {
    headline?: string
    byline?: string
    imgUrl?: string
    content?: string
    hideOnMobile?: boolean
}

export const Hero = ({
    headline,
    byline,
    imgUrl,
    content,
    hideOnMobile,
}: HeroProps) => (
    <section
        id="hero"
        className={classNames(
            styles.container,
            hideOnMobile && 'hidden sm:block'
        )}
    >
        <div className={styles.title}>
            {headline && <h2 className={styles.headline}>{headline}</h2>}
            {byline && <h3 className={styles.byline}>{byline}</h3>}
        </div>

        {imgUrl && <Image alt={headline} className={styles.img} src={imgUrl} />}

        {content && <p className={styles.content}>{content}</p>}
    </section>
)
