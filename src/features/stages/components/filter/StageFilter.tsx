import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetAllMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import classNames from 'classnames'
import type { Stage } from '../../types'

export interface StageFilterProps {
    onFilterChange: (filteredStages: Stage[]) => void
    stages: Stage[]
}

export const StageFilter = ({ onFilterChange, stages }: StageFilterProps) => {
    const { t } = useTranslation(['stage', 'makeupBag'])

    const [selectedMakeupBagId, setSelectedMakeupBagId] =
        useState('noMakeupBag')

    const { data: makeupBags = [] } = useGetAllMakeupBagsQuery()

    useEffect(() => {
        if (!makeupBags.length) return

        const stageIds = makeupBags.flatMap(
            (bag) => bag.stages?.map((s) => s._id!) || []
        )

        const noMakeupBagStages = stages.filter(
            ({ _id }) => !stageIds.includes(_id!)
        )

        const selectedMakeupBag = makeupBags.find(
            (bag) => bag._id === selectedMakeupBagId
        )

        const selectedStages = selectedMakeupBag
            ? stages.filter(({ _id }) =>
                  selectedMakeupBag.stages?.some((s) => s._id === _id)
              )
            : noMakeupBagStages

        onFilterChange(selectedStages)
    }, [selectedMakeupBagId, makeupBags, stages, onFilterChange])

    return (
        <div className="mb-6 grid ps-4 pe-5 sm:p-0">
            <ChevronDownIcon className="pointer-events-none relative right-4 z-10 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end text-neutral-600 dark:text-neutral-400 forced-colors:hidden" />
            <select
                className={classNames(
                    'col-start-1 row-start-1 block w-full appearance-none rounded-xl py-2.5 ps-4 pe-10 focus:outline-none',
                    'bg-white placeholder-neutral-500',
                    'border border-neutral-200 focus:border-black',
                    'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white'
                )}
                onChange={(e) => setSelectedMakeupBagId(e.target.value)}
                value={selectedMakeupBagId}
            >
                <option value="noMakeupBag">{t('noMakeupBag')}</option>
                {makeupBags.map(({ _id, category, client }) => (
                    <option key={_id} value={_id}>
                        {`${t(`makeupBag:categories.${category?.name}.short`)} - ${client?.username}`}
                    </option>
                ))}
            </select>
        </div>
    )
}
