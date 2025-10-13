import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useGetAllStagesQuery } from '@/features/stages/api/stagesApi'
import { StageFilter } from '@/features/stages/components/filter/StageFilter'
import { StageMobileView } from '@/features/stages/components/mobile-view/StageMobileView'
import { StageTable } from '@/features/stages/components/table/StageTable'
import type { Stage } from '@/features/stages/types'
import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const StageList = () => {
    const { t } = useTranslation(['stage', 'component'])
    const dispatch = useAppDispatch()

    const [filteredStages, setFilteredStages] = useState<Stage[]>([])
    const { data: stages = [], isLoading, error } = useGetAllStagesQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const handleFilterChange = useCallback((filteredStages: Stage[]) => {
        setFilteredStages(filteredStages)
    }, [])

    const title = [
        t('titles.list'),
        filteredStages.length && `(${filteredStages.length})`,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <Header />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} />
                    <StageFilter
                        onFilterChange={handleFilterChange}
                        stages={stages}
                    />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <StageMobileView stages={filteredStages} />
                        <StageTable stages={filteredStages} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
