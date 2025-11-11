import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'

interface NarrowServiceCardProps {
    name: string
    blurb: string
    priceEur: number
    oldPriceEur?: number
    time: string
    features: string[]
    popular?: boolean
}

export const NarrowServiceCard = ({
    name,
    blurb,
    priceEur,
    oldPriceEur,
    time,
    features,
    popular,
}: NarrowServiceCardProps) => {
    const { t } = useTranslation('pricing')

    return (
        <div
            className={classNames(
                'relative flex flex-col rounded-xl p-8',
                !popular &&
                    'shadow-md ring-1 ring-neutral-200 dark:ring-neutral-700',
                popular && 'ring-2 ring-rose-500 dark:ring-rose-400'
            )}
        >
            <h4
                className={classNames(
                    'text-base/7 font-semibold text-pretty',
                    !popular && 'text-black dark:text-white',
                    popular && 'text-rose-500 dark:text-rose-400'
                )}
            >
                {name}
            </h4>

            <p className="mt-4 flex items-baseline gap-x-2">
                {oldPriceEur && (
                    <span className="text-5xl font-semibold tracking-tight text-black/30 line-through dark:text-white/40">{`€${oldPriceEur}`}</span>
                )}
                <span className="text-5xl font-semibold tracking-tight text-black dark:text-white">{`€${priceEur}`}</span>
                <span className="text-base text-neutral-500 dark:text-gray-400">{`/ ${time}`}</span>
            </p>

            <p className="mt-6 text-base/7 text-pretty text-neutral-700 md:text-sm/7 dark:text-gray-300">
                {blurb}
            </p>

            <ul
                role="list"
                className="my-8 space-y-3 text-base text-pretty text-neutral-700 md:my-10 md:text-sm dark:text-gray-300"
            >
                {features.map((f) => (
                    <li key={f} className="flex gap-x-3">
                        <CheckIcon
                            aria-hidden="true"
                            className="h-6 w-5 flex-none text-rose-500 dark:text-rose-400"
                        />
                        {f}
                    </li>
                ))}
            </ul>

            <a
                href={config.contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(
                    'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                    'dark:focus-visible:outline-rose-700',
                    'mt-auto block rounded-lg px-4 py-2 text-center font-light font-stretch-75% transition-colors',
                    !popular &&
                        'border border-rose-500 bg-white text-rose-500 hover:border-rose-700 hover:text-rose-700 dark:border-rose-500 dark:bg-black dark:text-rose-500 dark:hover:border-rose-400 dark:hover:text-rose-400',
                    popular &&
                        'bg-rose-500 text-white hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500'
                )}
            >
                {t('buttons.book')}
            </a>
        </div>
    )
}
