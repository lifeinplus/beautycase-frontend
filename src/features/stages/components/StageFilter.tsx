import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetAllMakeupBagsQuery } from '@/features/makeupBags/makeupBagsApi'
import selectStyles from '@/shared/components/forms/SelectSection.module.css'
import type { Stage } from '../types'

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
        <div className="mb-6 grid pe-5 ps-4 sm:p-0">
            <ChevronDownIcon className={selectStyles.icon} />
            <select
                className={selectStyles.select}
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
