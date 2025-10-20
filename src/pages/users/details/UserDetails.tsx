import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useGetUserByIdQuery } from '@/features/users/api/usersApi'
import { UserFields } from '@/features/users/components/fields/UserFields'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { useUserDetailsActions } from './hooks/useUserDetailsActions'

export const UserDetails = () => {
    const { id } = useParams()
    const { t } = useTranslation(['user', 'component', 'account'])

    const { data, isLoading, error } = useGetUserByIdQuery(id)

    const actions = useUserDetailsActions()
    const backAction = actions.find((action) => action.key === 'back')

    const title = data?.user.username || t('titles.details')
    const subtitle = t(`account:fields.role.types.${data?.user.role}`)

    return (
        <article className="pb-13 sm:pb-0">
            <TopPanel title={title} onBack={backAction?.onClick} />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <DataWrapper isLoading={isLoading} error={error}>
                        <TitleSection
                            title={title}
                            subtitle={subtitle}
                            hideOnMobile
                        />

                        <section className="mt-2 mb-3 sm:hidden">
                            <h2 className="font-heading px-3 text-center text-lg text-slate-700 dark:text-slate-400">
                                {subtitle}
                            </h2>
                        </section>

                        {data && <UserFields data={data} />}
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
