import {
    ArrowLeftIcon,
    CheckIcon,
    ChevronDownIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { selectFormData, setFormData } from '../../form'
import { type StoreLink, useGetStoresQuery } from '../../stores'

export const StoreLinkAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)
    const { data: stores } = useGetStoresQuery()

    const emptyStoreLink: StoreLink = { _id: '', link: '', name: '' }

    const [storeLinks, setStoreLinks] = useState<StoreLink[]>([
        ...(formData.storeLinks?.length
            ? formData.storeLinks
            : [emptyStoreLink]),
    ])

    const title = 'Добавить ссылки'

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
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <section className="gallery-header">
                        <h1 className="gallery-title">{title}</h1>
                    </section>

                    <form onSubmit={handleSave} className="form px-0 pt-6">
                        {storeLinks.map((storeLink, index) => {
                            const { _id = '', link } = storeLink

                            return (
                                <div
                                    key={index}
                                    className="store-link-container"
                                >
                                    <div className="grid sm:col-span-3">
                                        <ChevronDownIcon className="form-select-icon" />
                                        <select
                                            className="form-select"
                                            name="stores"
                                            onChange={(e) =>
                                                handleChangeStore(e, index)
                                            }
                                            value={_id}
                                        >
                                            <option value="" disabled>
                                                Выбрать
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
                                            className="form-input sm:hidden"
                                            name="links"
                                            onChange={(e) =>
                                                handleChangeLink(e, index)
                                            }
                                            placeholder="Ссылка"
                                            required={true}
                                            value={link}
                                        />
                                        <input
                                            className="form-input hidden sm:block"
                                            onChange={(e) =>
                                                handleChangeLink(e, index)
                                            }
                                            placeholder="Ссылка"
                                            type="url"
                                            value={link}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <button
                                            className="form-button"
                                            onClick={() => handleDelete(index)}
                                            type="button"
                                        >
                                            <MinusCircleIcon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="px-3">
                            <button
                                className="form-button"
                                onClick={handleAdd}
                                type="button"
                            >
                                <PlusCircleIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />
                            </button>
                        </div>
                    </form>
                </article>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text="Назад"
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavigationButton
                    icon={<CheckIcon className="h-6 w-6" />}
                    text="Сохранить"
                    onClick={handleSave}
                />
            </AdaptiveNavBar>
        </article>
    )
}
