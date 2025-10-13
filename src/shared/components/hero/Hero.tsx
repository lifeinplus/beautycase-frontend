import classNames from 'classnames'

import { Image } from '../ui/image/Image'

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
            'mb-6 flex flex-col items-center justify-center pt-6 sm:pt-0',
            hideOnMobile && 'hidden sm:block'
        )}
    >
        <div className="mx-auto w-11/12 space-y-3">
            {headline && (
                <h2 className="font-heading mx-auto text-center text-2xl font-bold md:text-3xl lg:text-4xl">
                    {headline}
                </h2>
            )}
            {byline && (
                <h3 className="font-heading mx-auto text-center text-slate-700 sm:text-xl dark:text-slate-400">
                    {byline}
                </h3>
            )}
        </div>

        {imgUrl && (
            <Image alt={headline} className="mt-6 sm:rounded" src={imgUrl} />
        )}

        {content && <p className="ms-3 me-3 mt-6">{content}</p>}
    </section>
)
