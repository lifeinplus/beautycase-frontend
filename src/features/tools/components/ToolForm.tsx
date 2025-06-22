import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
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
        ? `Добавлено: ${storeLinks.length}`
        : 'Добавить'

    const handleBack = () => {
        navigate(-1)
    }

    const handleNavigate = () => {
        dispatch(setFormData(watch()))
        navigate('/stores/links/add')
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
                            label={'Бренд'}
                            options={brandOptions}
                            register={register('brandId')}
                            required={true}
                            value={watch('brandId')}
                        />

                        <TextareaSection
                            error={t(errors.name?.message || '')}
                            label={'Название'}
                            register={register('name')}
                            required={true}
                            value={watch('name')}
                        />

                        <ImageUrlSection
                            clearErrors={clearErrors}
                            folder="tools"
                            error={errors.imageUrl}
                            label="Ссылка на изображение"
                            name="imageUrl"
                            register={register('imageUrl')}
                            required={true}
                            setValue={setValue}
                            value={watch('imageUrl')}
                        />

                        <InputSection
                            error={errors.number?.message}
                            label={'Номер'}
                            register={register('number')}
                            type={'text'}
                        />

                        <TextareaSection
                            error={t(errors.comment?.message || '')}
                            label={'Комментарий'}
                            register={register('comment')}
                            required={true}
                            value={watch('comment')}
                        />

                        <ButtonNavigateSection
                            error={t(errors.storeLinks?.message || '')}
                            label={'Ссылки на инструмент'}
                            onNavigate={handleNavigate}
                            required={true}
                            text={linksText}
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
