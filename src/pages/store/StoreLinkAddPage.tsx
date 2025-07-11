import {
    ArrowLeftIcon,
    CheckIcon,
    ChevronDownIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectFormData, setFormData } from '@/features/form/formSlice'
import { useGetAllStoresQuery } from '@/features/stores/storesApi'
import { StoreLink } from '@/features/stores/types'
import { Button } from '@/shared/components/forms/Button'
import selectStyles from '@/shared/components/forms/SelectSection.module.css'
import galleryStyles from '@/shared/components/gallery/gallery.module.css'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import inputStyles from '@/shared/components/ui/Input.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import styles from './StoreLinkAddPage.module.css'

export const StoreLinkAddPage = () => {
    const navigate = useNavigate()
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
        const filtered = storeLinks.filter((l) => l._id)

        dispatch(
            setFormData({
                ...formData,
                storeLinks: filtered,
            })
        )

        navigate(-1)
    }

    return (
        <article className={pageStyles.page}>
            <TopPanel title={t('titles.add')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.contentContainer}>
                    <section className={galleryStyles.header}>
                        <h1 className={galleryStyles.title}>
                            {t('titles.add')}
                        </h1>
                    </section>

                    <form onSubmit={handleSave} className="form px-0 pt-6">
                        {storeLinks.map((storeLink, index) => {
                            const { _id = '', link } = storeLink

                            return (
                                <div key={index} className={styles.container}>
                                    <div className="grid sm:col-span-3">
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
                                    <div className="sm:col-span-7">
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
                                    <div className="sm:col-span-2">
                                        <Button
                                            ariaLabel={t(
                                                'buttonDelete.ariaLabel'
                                            )}
                                            className="w-full"
                                            onClick={() => handleDelete(index)}
                                            type="button"
                                            variant="danger"
                                        >
                                            <MinusCircleIcon className="h-6 w-6" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="px-3">
                            <Button
                                ariaLabel={t('buttonAdd.ariaLabel')}
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
