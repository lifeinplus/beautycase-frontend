import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { Image } from '../../../components/ui/Image'
import { TopPanel } from '../../../components/TopPanel'
import { DataWrapper } from '../../../components/DataWrapper'
import config from '../../../config'
import { selectFormData, setFormData } from '../../form/formSlice'
import { useGetAllUsersQuery } from '../usersApi'

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
        <article className="page">
            <TopPanel title={t('titles.selection')} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <section className="gallery-header">
                        <h1 className="gallery-title">
                            {t('titles.selection')}
                        </h1>
                    </section>

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={clients}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <section className="gallery-container-clients">
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

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text={t('navigation:actions.back')}
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavigationButton
                    icon={<CheckIcon className="h-6 w-6" />}
                    text={t('navigation:actions.save')}
                    onClick={handleSave}
                />
            </AdaptiveNavBar>
        </article>
    )
}
