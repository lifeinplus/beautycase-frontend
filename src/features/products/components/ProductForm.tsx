import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { useGetAllBrandsQuery } from '@/features/brands/brandsApi'
import { selectFormData } from '@/features/form/formSlice'
import type { SelectOption } from '@/features/form/types'
import { TitleSection } from '@/shared/components/common/TitleSection'
import formStyles from '@/shared/components/forms/form.module.css'
import { ImageUrlSection } from '@/shared/components/forms/ImageUrlSection'
import { InputSection } from '@/shared/components/forms/InputSection'
import { SelectSection } from '@/shared/components/forms/SelectSection'
import { TextareaSection } from '@/shared/components/forms/TextareaSection'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import buttonStyles from '@/shared/components/ui/button.module.css'
import { ButtonSubmit } from '@/shared/components/ui/ButtonSubmit'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { Product } from '../types'
import { productSchema } from '../validations'

export interface ProductFormProps {
    title: string
    onSubmit: (data: Product) => void
    isSaving?: boolean
}

export const ProductForm = ({
    title,
    onSubmit,
    isSaving = false,
}: ProductFormProps) => {
    const navigate = useNavigate()
    const { t } = useTranslation('product')

    const {
        clearErrors,
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Product>({
        resolver: yupResolver(productSchema),
    })

    const formData: Product = useAppSelector(selectFormData)

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
        <article className={pageStyles.page}>
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
                                folder="products"
                                error={t(errors.imageUrl?.message || '')}
                                label={t('fields.imageUrl.label')}
                                name={'imageUrl'}
                                register={register('imageUrl')}
                                required={true}
                                setValue={setValue}
                                value={watch('imageUrl')}
                            />

                            <InputSection
                                error={t(errors.shade?.message || '')}
                                label={t('fields.shade.label')}
                                register={register('shade')}
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
