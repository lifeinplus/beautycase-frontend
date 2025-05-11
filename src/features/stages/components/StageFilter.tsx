import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

import { useReadMakeupBagsQuery } from '../../makeupBags/makeupBagsApi'
import type { Stage } from '../types'

export interface StageFilterProps {
    onFilterChange: (filteredStages: Stage[]) => void
    stages: Stage[]
}

export const StageFilter = ({ onFilterChange, stages }: StageFilterProps) => {
    const [selectedMakeupBagId, setSelectedMakeupBagId] =
        useState('noMakeupBag')

    const { data: makeupBags = [] } = useReadMakeupBagsQuery()

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
            <ChevronDownIcon className="form-select-icon" />
            <select
                className="form-select"
                onChange={(e) => setSelectedMakeupBagId(e.target.value)}
                value={selectedMakeupBagId}
            >
                <option value="noMakeupBag">Без косметички</option>
                {makeupBags.map(({ _id, category, client }) => (
                    <option key={_id} value={_id}>
                        {`${category?.name} - ${client?.username}`}
                    </option>
                ))}
            </select>
        </div>
    )
}
