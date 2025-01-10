import { useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, DataWrapper, Header, Hero } from '../../../components'
import { selectUserId } from '../../auth'
import { useGetUserByIdQuery, User } from '../../users'

interface Field {
    label: string
    sysname: keyof User
    emptyMessage?: string
}

const fields: Field[] = [
    {
        label: 'Имя пользователя',
        sysname: 'username',
    },
    {
        label: 'Роль',
        sysname: 'role',
    },
    {
        label: 'Косметички',
        sysname: 'beautyBags',
        emptyMessage: 'У вас нет доступных косметичек',
    },
    {
        label: 'Уроки',
        sysname: 'lessons',
        emptyMessage: 'У вас нет доступных уроков',
    },
]

export const AccountPage = () => {
    const userId = useAppSelector(selectUserId)

    const { data, isLoading, error } = useGetUserByIdQuery(userId || '')

    return (
        <article className="page">
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container page-content__container-xl">
                        <Hero
                            headline="Личный кабинет"
                            byline="Сведения о вас и доступный контент"
                        />

                        <DataWrapper
                            isLoading={isLoading}
                            error={error}
                            data={data}
                            emptyMessage="Пользователь не найден"
                        >
                            <div className="dl-container">
                                <dl className="dl">
                                    {fields.map((f) => (
                                        <div
                                            key={f.sysname}
                                            className="dl-grid"
                                        >
                                            <dt className="dt">{f.label}</dt>
                                            <dd className="dd">
                                                {data?.[f.sysname] ||
                                                    f.emptyMessage}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </DataWrapper>
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
