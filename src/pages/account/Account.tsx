import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/app/hooks/hooks'
import { AccountFields } from '@/features/account/components/fields/AccountFields'
import { selectUserId } from '@/features/auth/slice/authSlice'
import { useGetUserByIdQuery } from '@/features/users/api/usersApi'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const Account = () => {
    const { t } = useTranslation(['account', 'makeupBag'])
    const userId = useAppSelector(selectUserId)

    const { data, isLoading, error } = useGetUserByIdQuery(userId)

    return (
        <article>
            <Header />
            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={t('hero.headline')}
                        byline={t('hero.byline')}
                    />
                    <DataWrapper isLoading={isLoading} error={error}>
                        {data && <AccountFields data={data} />}
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
