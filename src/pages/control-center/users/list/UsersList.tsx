import { useTranslation } from 'react-i18next'

import { useGetAllUsersQuery } from '@/features/users/api/usersApi'
import { UsersMobileView } from '@/features/users/components/mobile-view/UsersMobileView'
import { UsersTable } from '@/features/users/components/table/UsersTable'
import { useBackToControlCenterAction } from '@/pages/control-center/gallery/hooks/useBackToControlCenterAction'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const UsersList = () => {
    const { t } = useTranslation(['user', 'account'])

    const { data = [], isLoading, error } = useGetAllUsersQuery()

    const backAction = useBackToControlCenterAction()

    const title = [t('hero.headline'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 sm:my-0 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <UsersMobileView data={data} />
                        <UsersTable data={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
