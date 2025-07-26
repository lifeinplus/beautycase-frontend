import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { StageFilter } from '@/features/stages/components/StageFilter'
import { StageMobileView } from '@/features/stages/components/StageMobileView'
import { StageTable } from '@/features/stages/components/StageTable'
import { useGetAllStagesQuery } from '@/features/stages/stagesApi'
import type { Stage } from '@/features/stages/types'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import pageStyles from '@/shared/components/ui/page.module.css'

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

    return (
        <article>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={t('titles.list')} />

                    <StageFilter
                        onFilterChange={handleFilterChange}
                        stages={stages}
                    />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={filteredStages}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <>
                            <StageMobileView stages={filteredStages} />
                            <StageTable stages={filteredStages} />
                        </>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
