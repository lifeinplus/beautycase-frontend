import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { TopPanel } from '../../../components/TopPanel'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { useGetAllCategoriesQuery } from '../../categories/categoriesApi'
import { SelectSection } from '../../form/components/SelectSection'
import { ButtonNavigateSection } from '../../form/components/ButtonNavigateSection'
import { selectFormData, setFormData } from '../../form/formSlice'
import type { SelectOption } from '../../form/types'
import { useGetAllUsersQuery } from '../../users/usersApi'
import type { MakeupBag } from '../types'
import { makeupBagSchema } from '../validations'

export interface MakeupBagFormProps {
    title: string
    onSubmit: (data: MakeupBag) => void
}

export const MakeupBagForm = ({ onSubmit, title }: MakeupBagFormProps) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('makeupBag')

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

    const { data: categories = [] } = useGetAllCategoriesQuery()
    const { data: users = [] } = useGetAllUsersQuery()

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

    const stagesText = stageIds
        ? `${t('fields.stages.selected')}: ${stageIds.length}`
        : t('fields.stages.select')

    const toolsText = toolIds
        ? `${t('fields.tools.selected')}: ${toolIds.length}`
        : t('fields.tools.select')

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
                            error={t(errors.categoryId?.message || '')}
                            label={t('fields.category.label')}
                            options={categoryOptions}
                            register={register('categoryId')}
                            required={true}
                            value={watch('categoryId')}
                        />

                        <SelectSection
                            error={t(errors.clientId?.message || '')}
                            label={t('fields.client.label')}
                            options={clientOptions}
                            register={register('clientId')}
                            required={true}
                            value={watch('clientId')}
                        />

                        <ButtonNavigateSection
                            error={t(errors.stageIds?.message || '')}
                            label={t('fields.stages.label')}
                            onNavigate={() => handleNavigate('stages')}
                            required={true}
                            text={stagesText}
                        />

                        <ButtonNavigateSection
                            error={t(errors.toolIds?.message || '')}
                            label={t('fields.tools.label')}
                            onNavigate={() => handleNavigate('tools')}
                            required={true}
                            text={toolsText}
                        />
                    </form>
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
                    onClick={handleSubmit(onSubmit)}
                />
            </AdaptiveNavBar>
        </article>
    )
}
