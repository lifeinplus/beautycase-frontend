import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useGetMineMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { useGetMineStagesQuery } from '@/features/stages/api/stagesApi'
import { StageFilter } from '@/features/stages/components/filter/StageFilter'
import { StageMobileView } from '@/features/stages/components/mobile-view/StageMobileView'
import { StageTable } from '@/features/stages/components/table/StageTable'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { titleWithCount } from '@/shared/utils/ui/titleWithCount'

export const StageList = () => {
    const { t } = useTranslation(['stage', 'component'])
    const dispatch = useAppDispatch()
    const backAction = useToBackstageGalleryAction()

    const [selectedMakeupBagId, setSelectedMakeupBagId] =
        useState('noMakeupBag')

    const { data: stages = [], isLoading, error } = useGetMineStagesQuery()
    const { data: makeupBags = [] } = useGetMineMakeupBagsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const filteredStages = useMemo(() => {
        if (!makeupBags.length) return stages

        const stageIds = makeupBags.flatMap(
            (bag) => bag.stages?.map((s) => s._id!) || []
        )

        if (selectedMakeupBagId === 'noMakeupBag') {
            return stages.filter(({ _id }) => !stageIds.includes(_id!))
        }

        const selectedMakeupBag = makeupBags.find(
            (bag) => bag._id === selectedMakeupBagId
        )

        if (!selectedMakeupBag) return []

        return stages.filter(({ _id }) =>
            selectedMakeupBag.stages?.some((s) => s._id === _id)
        )
    }, [stages, makeupBags, selectedMakeupBagId])

    const title = titleWithCount(t('titles.list'), filteredStages.length)

    const handleSelectMakeupBag = useCallback((id: string) => {
        setSelectedMakeupBagId(id)
    }, [])

    return (
        <article>
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 md:my-0 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} hideOnMobile />
                    <StageFilter onSelectMakeupBag={handleSelectMakeupBag} />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <StageMobileView stages={filteredStages} />
                        <StageTable stages={filteredStages} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
