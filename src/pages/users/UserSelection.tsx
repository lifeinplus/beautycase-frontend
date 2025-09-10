import classNames from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import config from '@/app/config'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectFormData, setFormData } from '@/features/form/formSlice'
import { useGetAllUsersQuery } from '@/features/users/usersApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { TitleSection } from '@/shared/components/common/TitleSection'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import buttonStyles from '@/shared/components/ui/button.module.css'
import { ButtonSubmit } from '@/shared/components/ui/ButtonSubmit'
import { Image } from '@/shared/components/ui/Image'
import imageStyles from '@/shared/components/ui/image.module.css'
import orderStyles from '@/shared/components/ui/order.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import styles from './UserSelection.module.css'

export const UserSelection = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('client')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)

    const { data: clients = [], isLoading, error } = useGetAllUsersQuery()

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

    return (
        <article>
            <TopPanel title={t('titles.selection')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <TitleSection title={t('titles.selection')} hideOnMobile />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={clients}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <article className={styles.container}>
                            {clients.map(({ _id, username }) => {
                                const isSelected = selectedIds.has(_id!)

                                return (
                                    <div
                                        key={_id}
                                        className="grid cursor-pointer grid-cols-5 gap-3"
                                        onClick={() => toggleSelectedId(_id!)}
                                    >
                                        <div
                                            className={classNames(
                                                imageStyles.container,
                                                imageStyles.square
                                            )}
                                        >
                                            <Image
                                                alt={username}
                                                className={classNames(
                                                    imageStyles.img,
                                                    'rounded'
                                                )}
                                                src={
                                                    config.cloudinary
                                                        .defaultAvatarUrl
                                                }
                                            />
                                        </div>

                                        <div className="col-span-3 flex items-center">
                                            <h2>{username}</h2>
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <span
                                                className={orderStyles.center}
                                            />
                                            {isSelected && (
                                                <span
                                                    className={
                                                        orderStyles.selected
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </article>

                        <section className={buttonStyles.section}>
                            <ButtonSubmit
                                className="sm:w-48"
                                label={t('navigation:actions.save')}
                                onClick={handleSave}
                            />
                        </section>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
