import {
    ChevronDownIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { clearFormData, selectFormData } from '@/features/form/slice/formSlice'
import { useGetAllStoresQuery } from '@/features/stores/api/storesApi'
import { StoreLink } from '@/features/stores/types'
import { Button } from '@/shared/components/forms/button/Button'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export interface StoreLinksAddProps {
    onSave: (id: string, storeLinks: StoreLink[]) => Promise<void>
    isSaving?: boolean
}

export const StoreLinksAdd = ({
    onSave,
    isSaving = false,
}: StoreLinksAddProps) => {
    const navigate = useNavigate()
    const { id } = useParams()
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

    const handleSave = async () => {
        if (!id) return

        try {
            const storeLinksWithId = storeLinks.filter((l) => l._id)
            await onSave(id, storeLinksWithId)
            dispatch(clearFormData())
            navigate(-1)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <article>
            <TopPanel title={t('titles.add')} onBack={handleBack} />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <TitleSection title={t('titles.add')} hideOnMobile />

                    <form className="space-y-6 px-0" onSubmit={handleSave}>
                        <article className="pb-4">
                            {storeLinks.map((storeLink, index) => {
                                const { _id = '', link } = storeLink

                                return (
                                    <div
                                        key={index}
                                        className={classNames(
                                            'space-y-4 border-b border-neutral-100 px-3 py-4',
                                            'sm:grid sm:grid-cols-12 sm:gap-4 sm:space-y-0 sm:border-b-0 sm:pt-0',
                                            'dark:border-neutral-800'
                                        )}
                                    >
                                        <div className="grid sm:col-span-3">
                                            <ChevronDownIcon className="pointer-events-none relative right-4 z-10 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end text-neutral-600 dark:text-neutral-400 forced-colors:hidden" />
                                            <select
                                                className={classNames(
                                                    'col-start-1 row-start-1 block w-full appearance-none rounded-xl py-2.5 ps-4 pe-10 focus:outline-none',
                                                    'bg-white placeholder-neutral-500',
                                                    'border border-neutral-200 focus:border-black',
                                                    'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white'
                                                )}
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
                                                aria-label={t(
                                                    'fields.link.ariaLabel'
                                                )}
                                                className={classNames(
                                                    'block w-full rounded-xl px-4 py-2.5 focus:outline-none',
                                                    'bg-white placeholder-neutral-500',
                                                    'border border-neutral-200 focus:border-black',
                                                    'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
                                                    'sm:hidden'
                                                )}
                                                name="links"
                                                onChange={(e) =>
                                                    handleChangeLink(e, index)
                                                }
                                                placeholder={t(
                                                    'fields.link.label'
                                                )}
                                                required={true}
                                                value={link}
                                            />
                                            <input
                                                aria-label={t(
                                                    'fields.link.ariaLabel'
                                                )}
                                                className={classNames(
                                                    'block w-full rounded-xl px-4 py-2.5 focus:outline-none',
                                                    'bg-white placeholder-neutral-500',
                                                    'border border-neutral-200 focus:border-black',
                                                    'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
                                                    'hidden sm:block'
                                                )}
                                                onChange={(e) =>
                                                    handleChangeLink(e, index)
                                                }
                                                placeholder={t(
                                                    'fields.link.label'
                                                )}
                                                type="url"
                                                value={link}
                                            />
                                        </div>
                                        <Button
                                            aria-label={t(
                                                'buttons.linkDelete.ariaLabel'
                                            )}
                                            className="w-full sm:col-span-2"
                                            onClick={() => handleDelete(index)}
                                            type="button"
                                            variant="danger"
                                        >
                                            <MinusCircleIcon className="h-6 w-6" />
                                        </Button>
                                    </div>
                                )
                            })}

                            <div className="mx-3 mt-4 sm:mt-0">
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
                        </article>

                        <section
                            className={classNames(
                                'border-t border-gray-300 px-3 pt-6',
                                'sm:flex sm:justify-end sm:border-0 sm:pt-0',
                                'dark:border-gray-700'
                            )}
                        >
                            <ButtonSubmit
                                isLoading={isSaving}
                                label={
                                    isSaving
                                        ? t('navigation:actions.saving')
                                        : t('navigation:actions.save')
                                }
                                onClick={handleSave}
                            />
                        </section>
                    </form>
                </article>
            </main>
        </article>
    )
}
