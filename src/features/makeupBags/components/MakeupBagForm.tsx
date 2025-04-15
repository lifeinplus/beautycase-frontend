import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { type FieldError, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { TopPanel } from '../../../components/TopPanel'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { useGetCategoriesQuery } from '../../categories/categoriesApiSlice'
import { SelectSection } from '../../form/components/SelectSection'
import { ButtonNavigateSection } from '../../form/components/ButtonNavigateSection'
import { selectFormData, setFormData } from '../../form/formSlice'
import type { SelectOption } from '../../form/types'
import { useGetUsersQuery } from '../../users/usersApiSlice'
import type { MakeupBag } from '../types'
import { makeupBagSchema } from '../validations'

interface MakeupBagFormProps {
    title: string
    onSubmit: (data: MakeupBag) => void
}

export const MakeupBagForm = ({ onSubmit, title }: MakeupBagFormProps) => {
    const navigate = useNavigate()
    const { id } = useParams()

    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<MakeupBag>({
        resolver: yupResolver(makeupBagSchema),
    })

    const dispatch = useAppDispatch()
    const formData: MakeupBag = useAppSelector(selectFormData)

    useEffect(() => {
        reset(formData)
    }, [formData])

    const { data: categories = [] } = useGetCategoriesQuery()
    const { data: users = [] } = useGetUsersQuery()

    const categoryOptions = categories.map(
        (c): SelectOption => ({
            text: c.name,
            value: c._id,
        })
    )

    const clientOptions = users.map(
        (u): SelectOption => ({
            text: u.username,
            value: u._id,
        })
    )

    const stageIds = watch('stageIds')
    const toolIds = watch('toolIds')

    const stagesText = stageIds ? `Выбрано: ${stageIds.length}` : 'Выбрать'
    const toolsText = toolIds ? `Выбрано: ${toolIds.length}` : 'Выбрать'

    const handleBack = () => {
        navigate(-1)
    }

    const handleNavigate = (path: string) => {
        dispatch(setFormData({ ...watch(), makeupBagId: id }))
        navigate(path)
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <section className="title-container hidden sm:block">
                        <h1 className="title-headline">{title}</h1>
                    </section>

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <SelectSection
                            error={errors.categoryId}
                            label="Категория"
                            options={categoryOptions}
                            register={register('categoryId')}
                            required={true}
                            value={watch('categoryId')}
                        />

                        <SelectSection
                            error={errors.clientId}
                            label="Клиент"
                            options={clientOptions}
                            register={register('clientId')}
                            required={true}
                            value={watch('clientId')}
                        />

                        <ButtonNavigateSection
                            error={errors.stageIds as FieldError}
                            label="Этапы"
                            onNavigate={() =>
                                handleNavigate('/stages/selection')
                            }
                            required={true}
                            text={stagesText}
                        />

                        <ButtonNavigateSection
                            error={errors.toolIds as FieldError}
                            label="Инструменты"
                            onNavigate={() =>
                                handleNavigate('/tools/selection')
                            }
                            required={true}
                            text={toolsText}
                        />
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
                    onClick={handleSubmit(onSubmit)}
                />
            </AdaptiveNavBar>
        </article>
    )
}
