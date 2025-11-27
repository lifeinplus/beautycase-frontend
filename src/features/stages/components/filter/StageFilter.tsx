import { ChevronDownIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetMineMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { fullName } from '@/shared/utils/ui/fullName'

export interface StageFilterProps {
    onSelectMakeupBag: (makeupBagId: string) => void
}

export const StageFilter = ({ onSelectMakeupBag }: StageFilterProps) => {
    const { t } = useTranslation(['stage', 'makeupBag'])
    const { data: makeupBags = [] } = useGetMineMakeupBagsQuery()

    const [selectedMakeupBagId, setSelectedMakeupBagId] =
        useState('noMakeupBag')

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedMakeupBagId(value)
        onSelectMakeupBag(value)
    }

    return (
        <div className="mb-6 grid ps-4 pe-5 md:p-0">
            <ChevronDownIcon className="pointer-events-none relative right-4 z-10 col-start-1 row-start-1 size-4 self-center justify-self-end text-neutral-600 dark:text-neutral-400 forced-colors:hidden" />
            <select
                className={classNames(
                    'col-start-1 row-start-1 block w-full appearance-none rounded-xl py-2.5 ps-4 pe-10 focus:outline-none',
                    'bg-white placeholder-neutral-400',
                    'border border-neutral-200 focus:border-black',
                    'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white'
                )}
                onChange={handleChange}
                value={selectedMakeupBagId}
            >
                <option value="noMakeupBag">{t('noMakeupBag')}</option>
                {makeupBags.map(({ _id, category, client }) => (
                    <option key={_id} value={_id}>
                        {`${t(`makeupBag:categories.${category?.name}.short`)} - ${fullName(client?.firstName, client?.lastName)}`}
                    </option>
                ))}
            </select>
        </div>
    )
}
