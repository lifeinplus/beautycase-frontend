import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/app/hooks'
import { AccountFields } from '@/features/account/components/AccountFields'
import { selectUserId } from '@/features/auth/authSlice'
import { useGetUserByIdQuery } from '@/features/users/usersApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import { NavBar } from '@/shared/components/navigation/NavBar'

export const AccountPage = () => {
    const { t } = useTranslation(['account', 'makeupBag'])
    const userId = useAppSelector(selectUserId)

    const { data, isLoading, error } = useGetUserByIdQuery(userId)

    return (
        <article className="page">
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero
                        headline={t('hero.headline')}
                        byline={t('hero.byline')}
                    />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessage')}
                    >
                        {data && <AccountFields data={data} />}
                    </DataWrapper>
                </article>
            </main>

            <NavBar />
        </article>
    )
}
