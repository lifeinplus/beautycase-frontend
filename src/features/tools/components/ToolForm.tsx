import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useGetAllBrandsQuery } from '@/features/brands/brandsApi'
import { selectFormData, setFormData } from '@/features/form/formSlice'
import type { SelectOption } from '@/features/form/types'
import { TitleSection } from '@/shared/components/common/TitleSection'
import { ButtonNavigateSection } from '@/shared/components/forms/ButtonNavigateSection'
import formStyles from '@/shared/components/forms/form.module.css'
import { ImageUrlSection } from '@/shared/components/forms/ImageUrlSection'
import { InputSection } from '@/shared/components/forms/InputSection'
import { SelectSection } from '@/shared/components/forms/SelectSection'
import { TextareaSection } from '@/shared/components/forms/TextareaSection'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { Tool } from '../types'
import { toolSchema } from '../validations'

export interface ToolFormProps {
    title: string
    onSubmit: (data: Tool) => void
}

export const ToolForm = ({ title, onSubmit }: ToolFormProps) => {
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

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData) as Tool

    useEffect(() => {
        reset(formData)
    }, [formData])

    const { data: brands } = useGetAllBrandsQuery()

    const brandOptions: SelectOption[] | undefined = brands?.map((b) => ({
        text: b.name,
        value: b._id!,
    }))

    const storeLinks = watch('storeLinks')

    const linksText = storeLinks
        ? `${t('fields.storeLinks.selected')}: ${storeLinks.length}`
        : t('fields.storeLinks.select')

    const handleBack = () => {
        navigate(-1)
    }

    const handleNavigate = () => {
        dispatch(setFormData(watch()))
        navigate('links')
    }

    return (
        <article className={pageStyles.page}>
            <TopPanel title={title} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.contentContainer}>
                    <TitleSection title={title} hideOnMobile />

                    <form
                        className={formStyles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
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

                        <ButtonNavigateSection
                            error={t(errors.storeLinks?.message || '')}
                            label={t('fields.storeLinks.label')}
                            onNavigate={handleNavigate}
                            required={true}
                            text={linksText}
                        />
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
                    onClick={handleSubmit(onSubmit)}
                />
            </NavBar>
        </article>
    )
}
