import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface AddonServiceCardProps {
    name: string
    blurb: string
}

export const AddonServiceCard = ({ name, blurb }: AddonServiceCardProps) => {
    const { t } = useTranslation('pricing')

    return (
        <div className="relative flex flex-col rounded-xl p-8 shadow-md ring-1 ring-neutral-200 dark:ring-neutral-700">
            <h4 className="text-base/7 font-semibold text-pretty text-black dark:text-white">
                {name}
            </h4>
            <p className="my-6 text-base/7 text-pretty text-neutral-700 md:text-sm/7 dark:text-gray-300">
                {blurb}
            </p>
            <a
                href={config.contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(
                    'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                    'dark:focus-visible:outline-rose-700',
                    'mt-auto flex justify-between rounded-lg border border-rose-500 bg-white px-4 py-2 text-center font-light text-rose-500 font-stretch-75% transition-all hover:border-rose-700 hover:text-rose-700',
                    'dark:border-rose-500 dark:bg-black dark:text-rose-500 dark:hover:border-rose-400 dark:hover:text-rose-400'
                )}
            >
                {t('buttons.download')}
                <ArrowDownTrayIcon className="size-6" />
            </a>
        </div>
    )
}
