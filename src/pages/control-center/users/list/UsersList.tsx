import { useTranslation } from 'react-i18next'

import { useGetAllUsersQuery } from '@/features/users/api/usersApi'
import { UsersMobileView } from '@/features/users/components/mobile-view/UsersMobileView'
import { UsersTable } from '@/features/users/components/table/UsersTable'
import { useToControlCenterGalleryAction } from '@/pages/control-center/gallery/hooks/useToControlCenterGalleryAction'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { titleWithCount } from '@/shared/utils/ui/titleWithCount'

export const UsersList = () => {
    const { t } = useTranslation(['user', 'account'])
    const { data = [], isLoading, error } = useGetAllUsersQuery()

    const backAction = useToControlCenterGalleryAction()

    const title = titleWithCount(t('hero.headline'), data.length)

    return (
        <article>
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 md:my-0 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <UsersMobileView data={data} />
                        <UsersTable data={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
