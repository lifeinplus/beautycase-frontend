import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/app/hooks/hooks'
import { AccountFields } from '@/features/account/components/fields/AccountFields'
import { selectUserId } from '@/features/auth/slice/authSlice'
import { useGetUserByIdQuery } from '@/features/users/api/usersApi'
import { Hero } from '@/shared/components/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const Account = () => {
    const { t } = useTranslation(['account', 'makeupBag'])
    const userId = useAppSelector(selectUserId)

    const { data, isLoading, error } = useGetUserByIdQuery(userId)

    return (
        <article>
            <Header />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero
                        title={t('hero.headline')}
                        subtitle={t('hero.byline')}
                    />
                    <DataWrapper isLoading={isLoading} error={error}>
                        {data && <AccountFields data={data} />}
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
