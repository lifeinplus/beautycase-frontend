import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'

interface WideServiceCardProps {
    name: string
    blurb: string
    priceEur: number
    oldPriceEur?: number
    features: string[]
}

export const WideServiceCard = ({
    name,
    blurb,
    priceEur,
    oldPriceEur,
    features,
}: WideServiceCardProps) => {
    const { t } = useTranslation('pricing')

    return (
        <div className="relative rounded-xl p-2 shadow-md ring-1 ring-neutral-200 dark:ring-neutral-700">
            <div className="p-6 pb-8">
                <h4 className="text-2xl font-semibold text-pretty text-black dark:text-white">
                    {name}
                </h4>
                <p className="mt-6 text-base/7 text-pretty text-neutral-700 md:text-sm/7 dark:text-gray-300">
                    {blurb}
                </p>
                <div className="mt-10 flex items-center gap-4">
                    <h4 className="flex-none text-rose-500 dark:text-rose-400">
                        {t('included')}
                    </h4>
                    <div className="h-px flex-auto bg-neutral-200 dark:bg-neutral-700"></div>
                </div>
                <ul
                    role="list"
                    className="mt-8 grid grid-cols-1 gap-5 text-base text-pretty text-neutral-700 md:mt-10 md:grid-cols-2 md:text-sm dark:text-gray-300"
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
            </div>

            <div className="rounded-lg bg-neutral-50 py-10 ring-1 ring-neutral-200 dark:bg-neutral-950 dark:ring-neutral-700">
                <div className="mx-auto max-w-80 px-8">
                    <p className="flex items-baseline justify-center gap-x-2">
                        {oldPriceEur && (
                            <span className="text-5xl font-semibold tracking-tight text-black/30 line-through dark:text-white/40">{`€${oldPriceEur}`}</span>
                        )}
                        <span className="text-5xl font-semibold tracking-tight text-black dark:text-white">{`€${priceEur}`}</span>
                    </p>
                    <a
                        href={config.contactLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classNames(
                            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                            'dark:focus-visible:outline-rose-700',
                            'mt-8 block rounded-lg border border-rose-500 bg-white px-4 py-2 text-center font-light text-rose-500 font-stretch-75% transition-all hover:border-rose-700 hover:text-rose-700 md:mt-10',
                            'dark:border-rose-500 dark:bg-black dark:text-rose-500 dark:hover:border-rose-400 dark:hover:text-rose-400'
                        )}
                    >
                        {t('buttons.get')}
                    </a>
                </div>
            </div>
        </div>
    )
}
