import { PlusIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectRole, selectUsername } from '@/features/auth/authSlice'
import { clearFormData } from '@/features/form/formSlice'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import pageStyles from '@/shared/components/ui/page.module.css'
import { canAccess } from '@/shared/utils/menu'
import { StageFilter } from '../../features/stages/components/StageFilter'
import { StageMobileView } from '../../features/stages/components/StageMobileView'
import { StageTable } from '../../features/stages/components/StageTable'
import { useGetAllStagesQuery } from '../../features/stages/stagesApi'
import type { Stage } from '../../features/stages/types'

const ACTIONS = {
    add: {
        icon: PlusIcon,
        label: 'actions.add',
    },
} as const

type ActionId = keyof typeof ACTIONS

interface ActionItem {
    id: ActionId
    auth?: boolean
    roles?: string[]
}

const ACTION_ITEMS: ActionItem[] = [
    { id: 'add', auth: true, roles: ['admin', 'mua'] },
]

export const StageListPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation(['stage', 'component'])

    const dispatch = useAppDispatch()
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const [filteredStages, setFilteredStages] = useState<Stage[]>([])

    const { data: stages = [], isLoading, error } = useGetAllStagesQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const actionHandlers = {
        add: () => navigate('add'),
    }

    const visibleActions = ACTION_ITEMS.filter((item) =>
        canAccess(item, username, role)
    ).map(({ id }) => ({
        key: id,
        icon: ACTIONS[id].icon,
        label: t(`navigation:${ACTIONS[id].label}`),
        onClick: actionHandlers[id],
    }))

    const handleFilterChange = useCallback((filteredStages: Stage[]) => {
        setFilteredStages(filteredStages)
    }, [])

    return (
        <article>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.contentContainer}>
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

            <NavBar>
                {visibleActions.map(({ key, icon, label, onClick }) => (
                    <NavButton
                        key={key}
                        icon={icon}
                        label={label}
                        onClick={onClick}
                    />
                ))}
            </NavBar>
        </article>
    )
}
