import {
    ArrowLeftIcon,
    CheckIcon,
    ChevronDownIcon,
    MinusCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/solid'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { selectFormData, setFormData } from '../../form'
import { Store, useGetStoresQuery } from '../../stores'

export const StoreLinkAddPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)
    const { data: stores } = useGetStoresQuery()

    const emptyStoreLink: Store = { _id: '', link: '', name: '' }

    const [storeLinks, setStoreLinks] = useState<Store[]>([
        ...(formData.stores?.length ? formData.stores : [emptyStoreLink]),
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
        e: ChangeEvent<HTMLTextAreaElement>,
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
                stores: filtered,
            })
        )

        navigate(-1)
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="content-container">
                        <section className="page-gallery__title">
                            <h1 className="page-gallery__title__text">
                                {title}
                            </h1>
                        </section>

                        <form onSubmit={handleSave} className="form pt-6">
                            {storeLinks.map((store, index) => {
                                const { _id = '', link } = store

                                return (
                                    <div key={index} className="space-y-4">
                                        <div className="grid">
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
                                        <textarea
                                            className="form-input"
                                            name="links"
                                            onChange={(e) =>
                                                handleChangeLink(e, index)
                                            }
                                            placeholder={'Ссылка'}
                                            required={true}
                                            value={link}
                                        />
                                        <button
                                            className="form-button"
                                            onClick={() => handleDelete(index)}
                                            type="button"
                                        >
                                            <MinusCircleIcon className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                                        </button>
                                    </div>
                                )
                            })}
                            <button
                                className="form-button"
                                onClick={handleAdd}
                                type="button"
                            >
                                <PlusCircleIcon className="h-6 w-6 text-lime-600 dark:text-lime-400" />
                            </button>
                        </form>
                    </article>
                </section>
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
