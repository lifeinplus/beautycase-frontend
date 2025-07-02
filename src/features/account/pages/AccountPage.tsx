import { useTranslation } from 'react-i18next'

import { useAppSelector } from '../../../app/hooks'
import { NavBar } from '../../../components/navigation/NavBar'
import { DataWrapper } from '../../../components/DataWrapper'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'
import { selectUserId } from '../../auth/authSlice'
import { useGetUserByIdQuery } from '../../users/usersApi'
import { AccountFields } from '../components/AccountFields'

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
