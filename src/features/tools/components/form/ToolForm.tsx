import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { useGetAllBrandsQuery } from '@/features/brands/api/brandsApi'
import { selectFormData } from '@/features/form/slice/formSlice'
import type { SelectOption } from '@/features/form/types'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import formStyles from '@/shared/components/forms/form.module.css'
import { ImageUrlSection } from '@/shared/components/forms/image/url-section/ImageUrlSection'
import { InputSection } from '@/shared/components/forms/input/section/InputSection'
import { SelectSection } from '@/shared/components/forms/select/section/SelectSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import buttonStyles from '@/shared/components/ui/button-submit/ButtonSubmit.module.css'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import type { Tool } from '../../types'
import { toolSchema } from '../../validations'

export interface ToolFormProps {
    title: string
    onSubmit: (data: Tool) => void
    isSaving?: boolean
}

export const ToolForm = ({
    title,
    onSubmit,
    isSaving = false,
}: ToolFormProps) => {
    const navigate = useNavigate()
    const { t } = useTranslation('tool')

    const {
        clearErrors,
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Tool>({
        resolver: yupResolver(toolSchema),
    })

    const formData = useAppSelector(selectFormData) as Tool

    useEffect(() => {
        reset(formData)
    }, [formData])

    const { data: brands } = useGetAllBrandsQuery()

    const brandOptions: SelectOption[] | undefined = brands?.map((b) => ({
        text: b.name,
        value: b._id!,
    }))

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <TitleSection title={title} hideOnMobile />

                    <form
                        className={formStyles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
                            <SelectSection
                                error={t(errors.brandId?.message || '')}
                                label={t('fields.brand.label')}
                                options={brandOptions}
                                register={register('brandId')}
                                required={true}
                                value={watch('brandId')}
                            />

                            <TextareaSection
                                error={t(errors.name?.message || '')}
                                label={t('fields.name.label')}
                                register={register('name')}
                                required={true}
                                value={watch('name')}
                            />

                            <ImageUrlSection
                                clearErrors={clearErrors}
                                folder="tools"
                                error={t(errors.imageUrl?.message || '')}
                                label={t('fields.imageUrl.label')}
                                name="imageUrl"
                                register={register('imageUrl')}
                                required={true}
                                setValue={setValue}
                                value={watch('imageUrl')}
                            />

                            <InputSection
                                label={t('fields.number.label')}
                                register={register('number')}
                                type={'text'}
                            />

                            <TextareaSection
                                error={t(errors.comment?.message || '')}
                                label={t('fields.comment.label')}
                                register={register('comment')}
                                required={true}
                                value={watch('comment')}
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
