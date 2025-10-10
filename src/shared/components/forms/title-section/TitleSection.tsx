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
            'sm:font-heading sm:mx-auto sm:mt-0 sm:mb-9 sm:block sm:w-11/12 sm:border-b-0 sm:px-0',
            hideOnMobile && 'hidden sm:block'
        )}
    >
        {title && (
            <h1 className="text-base font-bold sm:text-center sm:text-2xl md:text-3xl lg:text-4xl dark:border-neutral-800">
                {title}
            </h1>
        )}
        {subtitle && (
            <p className="text-sm text-slate-700 sm:mt-3 sm:text-center sm:text-xl dark:text-slate-400">
                {subtitle}
            </p>
        )}
    </section>
)
