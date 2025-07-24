import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/app/hooks'
import { AccountFields } from '@/features/account/components/AccountFields'
import { selectUserId } from '@/features/auth/authSlice'
import { useGetUserByIdQuery } from '@/features/users/usersApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import pageStyles from '@/shared/components/ui/page.module.css'

export const Account = () => {
    const { t } = useTranslation(['account', 'makeupBag'])
    const userId = useAppSelector(selectUserId)

    const { data, isLoading, error } = useGetUserByIdQuery(userId)

    return (
        <article className={pageStyles.page}>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
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
        </article>
    )
}
