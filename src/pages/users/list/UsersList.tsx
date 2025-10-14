import { useTranslation } from 'react-i18next'

import { useGetAllUsersQuery } from '@/features/users/api/usersApi'
import { UsersMobileView } from '@/features/users/components/mobile-view/UsersMobileView'
import { UsersTable } from '@/features/users/components/table/UsersTable'
import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const UsersList = () => {
    const { t } = useTranslation(['user', 'account'])

    const { data = [], isLoading, error } = useGetAllUsersQuery()

    const title = [t('hero.headline'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <Header />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <UsersMobileView data={data} />
                        <UsersTable data={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
