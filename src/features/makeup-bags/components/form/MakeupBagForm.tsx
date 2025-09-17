import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { useGetAllCategoriesQuery } from '@/features/categories/api/categoriesApi'
import { selectFormData, setFormData } from '@/features/form/slice/formSlice'
import type { SelectOption } from '@/features/form/types'
import { useGetAllUsersQuery } from '@/features/users/api/usersApi'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import { ButtonNavigateSection } from '@/shared/components/forms/button-navigate/section/ButtonNavigateSection'
import formStyles from '@/shared/components/forms/form.module.css'
import { SelectSection } from '@/shared/components/forms/select/section/SelectSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import buttonStyles from '@/shared/components/ui/button-submit/ButtonSubmit.module.css'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import type { MakeupBag } from '../../types'
import { makeupBagSchema } from '../../validations'

export interface MakeupBagFormProps {
    title: string
    onSubmit: (data: MakeupBag) => void
    isSaving?: boolean
}

export const MakeupBagForm = ({
    onSubmit,
    title,
    isSaving = false,
}: MakeupBagFormProps) => {
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

    // TODO: only makeup bag categories
    const { data: categories = [] } = useGetAllCategoriesQuery()
    const { data: users = [] } = useGetAllUsersQuery()

    const categoryOptions = categories.map(
        (c): SelectOption => ({
            text: t(`categories.${c.name}.full`),
            value: c._id!,
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
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <TitleSection title={title} hideOnMobile />

                    <form
                        className={classNames(formStyles.form)}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
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
                        </article>

                        <section className={buttonStyles.section}>
                            <ButtonSubmit
                                className="sm:w-48"
                                isLoading={isSaving}
                                label={
                                    isSaving
                                        ? t('navigation:actions.saving')
                                        : t('navigation:actions.save')
                                }
                            />
                        </section>
                    </form>
                </article>
            </main>
        </article>
    )
}
