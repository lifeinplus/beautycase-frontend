import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { NavBar } from '../../../components/navigation/NavBar'
import { NavButton } from '../../../components/navigation/NavButton'
import { TopPanel } from '../../../components/TopPanel'
import { useGetAllBrandsQuery } from '../../brands/brandsApi'
import { ButtonNavigateSection } from '../../form/components/ButtonNavigateSection'
import { ImageUrlSection } from '../../form/components/ImageUrlSection'
import { InputSection } from '../../form/components/InputSection'
import { SelectSection } from '../../form/components/SelectSection'
import { TextareaSection } from '../../form/components/TextareaSection'
import { selectFormData, setFormData } from '../../form/formSlice'
import type { SelectOption } from '../../form/types'
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
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <section className="title-container hidden sm:block">
                        <h1 className="title-headline">{title}</h1>
                    </section>

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    label={t('navigation:actions.back')}
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavButton
                    icon={<CheckIcon className="h-6 w-6" />}
                    label={t('navigation:actions.save')}
                    onClick={handleSubmit(onSubmit)}
                />
            </NavBar>
        </article>
    )
}
