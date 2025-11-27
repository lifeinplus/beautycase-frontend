import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import config from '@/app/config/config'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectFormData, setFormData } from '@/features/form/slice/formSlice'
import { useGetAllClientsQuery } from '@/features/users/api/usersApi'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { Image } from '@/shared/components/ui/image/Image'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { fullNameWithUsername } from '@/shared/utils/ui/fullNameWithUsername'

export const UserSelection = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('client')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)

    const { data: clients = [], isLoading, error } = useGetAllClientsQuery()

    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
        return new Set(formData.clientIds || [])
    })

    const toggleSelectedId = (id: string) => {
        setSelectedIds((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleSave = () => {
        dispatch(
            setFormData({
                ...formData,
                clientIds: Array.from(selectedIds),
            })
        )
        navigate(-1)
    }

    const title = t('titles.selection')

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <TitleSection title={title} hideOnMobile />

                    <DataWrapper isLoading={isLoading} error={error}>
                        <article className="mx-auto my-4 grid max-w-2xl grid-cols-1 gap-3 px-3 md:grid-cols-2">
                            {clients.map(
                                ({ _id, firstName, lastName, username }) => {
                                    const isSelected = selectedIds.has(_id!)

                                    return (
                                        <div
                                            key={_id}
                                            className="grid cursor-pointer grid-cols-5 gap-3"
                                            onClick={() =>
                                                toggleSelectedId(_id!)
                                            }
                                        >
                                            <div className="relative mx-auto aspect-square w-full overflow-hidden">
                                                <Image
                                                    alt={username}
                                                    className="h-full w-full rounded-sm object-cover md:rounded"
                                                    src={
                                                        config.cloudinary
                                                            .defaultAvatarUrl
                                                    }
                                                />
                                            </div>

                                            <div className="col-span-3 flex items-center">
                                                <h2>
                                                    {fullNameWithUsername(
                                                        firstName,
                                                        lastName,
                                                        username
                                                    )}
                                                </h2>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <span className="absolute size-6 rounded-full border-2 border-white shadow-lg" />
                                                {isSelected && (
                                                    <span className="absolute h-3.5 w-3.5 rounded-full bg-rose-500 text-white" />
                                                )}
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </article>

                        <section className="border-t border-gray-300 px-3 pt-6 md:flex md:justify-end md:border-0 md:pt-0 dark:border-gray-700">
                            <ButtonSubmit
                                label={t('actions:save')}
                                onClick={handleSave}
                            />
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
