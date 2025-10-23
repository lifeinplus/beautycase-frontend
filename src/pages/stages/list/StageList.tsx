import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useGetAllStagesQuery } from '@/features/stages/api/stagesApi'
import { StageFilter } from '@/features/stages/components/filter/StageFilter'
import { StageMobileView } from '@/features/stages/components/mobile-view/StageMobileView'
import { StageTable } from '@/features/stages/components/table/StageTable'
import type { Stage } from '@/features/stages/types'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { getTitleWithCount } from '@/shared/utils/ui/getTitleWithCount'

export const StageList = () => {
    const { t } = useTranslation(['stage', 'component'])
    const dispatch = useAppDispatch()

    const [filteredStages, setFilteredStages] = useState<Stage[]>([])
    const { data: stages = [], isLoading, error } = useGetAllStagesQuery()

    const backAction = useToBackstageGalleryAction()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const handleFilterChange = useCallback((filteredStages: Stage[]) => {
        setFilteredStages(filteredStages)
    }, [])

    const title = getTitleWithCount(t('titles.list'), filteredStages.length)

    return (
        <article>
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 sm:my-0 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero title={title} hideOnMobile />
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
