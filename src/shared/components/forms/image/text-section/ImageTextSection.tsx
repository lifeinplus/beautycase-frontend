import { PhotoIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import type {
    FieldValues,
    Path,
    PathValue,
    UseFormClearErrors,
    UseFormRegisterReturn,
    UseFormSetValue,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useUploadTempImageByFileMutation } from '@/features/uploads/api/uploadsApi'
import commonStyles from '@/shared/components/common/common.module.css'
import { SpinnerButton } from '@/shared/components/common/spinner-button/SpinnerButton'
import formStyles from '@/shared/components/forms/form.module.css'
import inputStyles from '@/shared/components/ui/input/Input.module.css'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { Label } from '../../label/Label'
import { ImagePreview } from '../preview/ImagePreview'

export interface ImageTextSectionProps<T extends FieldValues> {
    clearErrors: UseFormClearErrors<T>
    folder: 'products' | 'questionnaires' | 'stages' | 'tools'
    label: string
    labelUrl: string
    name: Path<T>
    nameUrl: Path<T>
    register: UseFormRegisterReturn
    registerUrl: UseFormRegisterReturn
    setValue: UseFormSetValue<T>
    description?: string
    error?: string
    required?: boolean
    value?: string
    valueUrl?: string
}

export const ImageTextSection = <T extends FieldValues>({
    clearErrors,
    folder,
    label,
    labelUrl,
    name,
    nameUrl,
    register,
    registerUrl,
    setValue,
    description,
    error,
    required = false,
    value = '',
    valueUrl = '',
}: ImageTextSectionProps<T>) => {
    const { t } = useTranslation('form')
    const [isUploading, setIsUploading] = useState(false)

    const [uploadTempImageByFile] = useUploadTempImageByFileMutation()

    const handleUploadByFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        setIsUploading(true)

        function fallbackText(value: string) {
            const text = `[${t('photoAttached')}]`
            return value ? value : text
        }

        try {
            const formData = new FormData()
            formData.append('folder', folder)
            formData.append('imageFile', file)

            const response = await uploadTempImageByFile(formData).unwrap()

            setValue(name, fallbackText(value) as PathValue<T, Path<T>>)
            setValue(nameUrl, response.imageUrl as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error('Image upload failed', error)
            toast.error(getErrorMessage(error))
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Label required={required} text={label} />

                <label
                    className={classNames(
                        isUploading
                            ? 'cursor-not-allowed opacity-50'
                            : 'cursor-pointer'
                    )}
                >
                    <PhotoIcon
                        className={classNames(
                            'h-6 w-6',
                            isUploading && 'animate-pulse'
                        )}
                    />

                    <input
                        accept="image/*,.heic"
                        className="hidden"
                        disabled={isUploading}
                        onChange={handleUploadByFile}
                        type="file"
                    />
                </label>
            </div>

            <div className="relative">
                <textarea
                    {...register}
                    className={classNames(
                        inputStyles.input,
                        error && inputStyles.error,
                        isUploading && 'opacity-50'
                    )}
                    disabled={isUploading}
                    placeholder={isUploading ? t('uploading') : label}
                />

                {isUploading && (
                    <div className="absolute inset-0 mt-6 flex justify-center rounded-xl text-rose-500 dark:text-rose-400">
                        <SpinnerButton />
                    </div>
                )}

                <textarea
                    {...registerUrl}
                    className="hidden"
                    placeholder={labelUrl}
                />

                {description && (
                    <p className={formStyles.description}>{description}</p>
                )}

                {error && (
                    <p
                        className={classNames(
                            commonStyles.textDanger,
                            formStyles.error
                        )}
                    >
                        {error}
                    </p>
                )}

                {valueUrl && <ImagePreview url={valueUrl} />}
            </div>
        </div>
    )
}
