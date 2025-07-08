import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import config from '@/app/config'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectFormData, setFormData } from '@/features/form/formSlice'
import { useGetAllUsersQuery } from '@/features/users/usersApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import galleryStyles from '@/shared/components/gallery/gallery.module.css'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import { Image } from '@/shared/components/ui/Image'
import pageStyles from '@/shared/components/ui/page.module.css'
import styles from './UserSelectionPage.module.css'

export const UserSelectionPage = () => {
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
        <article className={pageStyles.page}>
            <TopPanel title={t('titles.selection')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.contentContainer}>
                    <section className={galleryStyles.header}>
                        <h1 className={galleryStyles.title}>
                            {t('titles.selection')}
                        </h1>
                    </section>

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={clients}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <section className={styles.container}>
                            {clients.map(({ _id, username }) => {
                                const isSelected = selectedIds.has(_id!)

                                return (
                                    <div
                                        key={_id}
                                        className="grid cursor-pointer grid-cols-5 gap-3"
                                        onClick={() => toggleSelectedId(_id!)}
                                    >
                                        <div className="img-container img-container-square">
                                            <Image
                                                alt={username}
                                                className="img rounded"
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
                                            <span className="img-order-center" />
                                            {isSelected && (
                                                <span className="img-selected" />
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                    </DataWrapper>
                </article>
            </main>

            <NavBar>
                <NavButton
                    icon={ArrowLeftIcon}
                    label={t('navigation:actions.back')}
                    onClick={handleBack}
                    className={navStyles.navBtnBack}
                />
                <NavButton
                    icon={CheckIcon}
                    label={t('navigation:actions.save')}
                    onClick={handleSave}
                />
            </NavBar>
        </article>
    )
}
