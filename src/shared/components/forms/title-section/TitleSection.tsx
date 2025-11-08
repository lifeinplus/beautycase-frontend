import classNames from 'classnames'

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
            'border-b-0.5 my-2 border-neutral-200 px-3',
            'md:font-heading md:mx-auto md:mt-0 md:mb-9 md:block md:w-11/12 md:border-b-0 md:px-0',
            hideOnMobile && 'hidden md:block'
        )}
    >
        {title && (
            <h1 className="text-base font-bold md:text-center md:text-3xl lg:text-4xl dark:border-neutral-800">
                {title}
            </h1>
        )}
        {subtitle && (
            <p className="text-sm text-slate-700 md:mt-3 md:text-center md:text-xl dark:text-slate-400">
                {subtitle}
            </p>
        )}
    </section>
)
