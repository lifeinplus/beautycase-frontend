import classNames from 'classnames'

import { Image } from '../ui/image/Image'

export interface HeroProps {
    title?: string
    subtitle?: string
    imgUrl?: string
    content?: string
    hideOnMobile?: boolean
}

export const Hero = ({
    title,
    subtitle,
    imgUrl,
    content,
    hideOnMobile,
}: HeroProps) => (
    <section
        id="hero"
        className={classNames(
            'mb-6 flex flex-col items-center justify-center pt-6 md:pt-0',
            hideOnMobile && 'hidden md:block'
        )}
    >
        <div className="mx-auto w-11/12 space-y-3">
            {title && (
                <h2 className="font-heading mx-auto text-center text-2xl font-bold md:text-3xl">
                    {title}
                </h2>
            )}
            {subtitle && (
                <h3 className="font-heading mx-auto text-center text-slate-700 md:text-xl dark:text-slate-400">
                    {subtitle}
                </h3>
            )}
        </div>

        {imgUrl && (
            <Image alt={title} className="mt-6 md:rounded" src={imgUrl} />
        )}

        {content && <p className="ms-3 me-3 mt-6">{content}</p>}
    </section>
)
