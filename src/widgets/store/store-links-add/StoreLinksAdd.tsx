import {
    ArrowLeftIcon,
    CheckIcon,
    ChevronDownIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { clearFormData, selectFormData } from '@/features/form/formSlice'
import { useGetAllStoresQuery } from '@/features/stores/storesApi'
import { StoreLink } from '@/features/stores/types'
import { TitleSection } from '@/shared/components/common/TitleSection'
import { Button } from '@/shared/components/forms/Button'
import formStyles from '@/shared/components/forms/form.module.css'
import selectStyles from '@/shared/components/forms/SelectSection.module.css'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import inputStyles from '@/shared/components/ui/Input.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { RouteId } from '@/shared/types/router'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import styles from './StoreLinksAdd.module.css'

export interface StoreLinksAddProps {
    onSave: (id: string, storeLinks: StoreLink[]) => Promise<void>
}

export const StoreLinksAdd = ({ onSave }: StoreLinksAddProps) => {
    const navigate = useNavigate()
    const { id } = useParams<RouteId>()
    const { t } = useTranslation('store')

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)
    const { data: stores } = useGetAllStoresQuery()

    const emptyStoreLink: StoreLink = { _id: '', link: '', name: '' }

    const [storeLinks, setStoreLinks] = useState<StoreLink[]>([
        ...(formData.storeLinks?.length
            ? formData.storeLinks
            : [emptyStoreLink]),
    ])

    const handleChangeStore = (
        e: ChangeEvent<HTMLSelectElement>,
        index: number
    ) => {
        const { options, selectedIndex, value } = e.target

        const updated = storeLinks.map((s, i) =>
            i === index
                ? { ...s, _id: value, name: options[selectedIndex].innerHTML }
                : s
        )

        setStoreLinks(updated)
    }

    const handleChangeLink = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target

        const updated = storeLinks.map((s, i) =>
            i === index ? { ...s, link: value } : s
        )

        setStoreLinks(updated)
    }

    const handleAdd = () => {
        setStoreLinks([...storeLinks, emptyStoreLink])
    }

    const handleDelete = (index: number) => {
        setStoreLinks(storeLinks.filter((_, i) => i !== index))
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleSave = () => {
        if (!id) return

        try {
            const storeLinksWithId = storeLinks.filter((l) => l._id)
            onSave(id, storeLinksWithId)
            dispatch(clearFormData())
            navigate(-1)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <article className={pageStyles.page}>
            <TopPanel title={t('titles.add')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <TitleSection title={t('titles.add')} hideOnMobile />

                    <form
                        className={(formStyles.form, 'px-0')}
                        onSubmit={handleSave}
                    >
                        {storeLinks.map((storeLink, index) => {
                            const { _id = '', link } = storeLink

                            return (
                                <div key={index} className={styles.container}>
                                    <div className={styles.stores}>
                                        <ChevronDownIcon
                                            className={selectStyles.icon}
                                        />
                                        <select
                                            className={selectStyles.select}
                                            name="stores"
                                            onChange={(e) =>
                                                handleChangeStore(e, index)
                                            }
                                            value={_id}
                                        >
                                            <option value="" disabled>
                                                {t('fields.stores.label')}
                                            </option>
                                            {stores?.map((s) => (
                                                <option
                                                    key={s._id}
                                                    value={s._id}
                                                >
                                                    {s.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.link}>
                                        <textarea
                                            className={classNames(
                                                inputStyles.input,
                                                'sm:hidden'
                                            )}
                                            name="links"
                                            onChange={(e) =>
                                                handleChangeLink(e, index)
                                            }
                                            placeholder={t('fields.link.label')}
                                            required={true}
                                            value={link}
                                        />
                                        <input
                                            aria-label={t(
                                                'fields.link.ariaLabel'
                                            )}
                                            className={classNames(
                                                inputStyles.input,
                                                'hidden sm:block'
                                            )}
                                            onChange={(e) =>
                                                handleChangeLink(e, index)
                                            }
                                            placeholder={t('fields.link.label')}
                                            type="url"
                                            value={link}
                                        />
                                    </div>
                                    <Button
                                        aria-label={t(
                                            'buttons.linkDelete.ariaLabel'
                                        )}
                                        className={styles.delete}
                                        onClick={() => handleDelete(index)}
                                        type="button"
                                        variant="danger"
                                    >
                                        <MinusCircleIcon className="h-6 w-6" />
                                    </Button>
                                </div>
                            )
                        })}
                        <div className={styles.add}>
                            <Button
                                aria-label={t('buttons.linkAdd.ariaLabel')}
                                className="w-full"
                                onClick={handleAdd}
                                type="button"
                                variant="success"
                            >
                                <PlusCircleIcon className="h-6 w-6" />
                            </Button>
                        </div>
                    </form>
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
