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
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { Label } from '../../label/Label'
import { ImagePreview } from '../preview/ImagePreview'
import { Spinner } from '../ui/Spinner'

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
                        'peer block w-full rounded-xl px-4 py-2.5 focus:outline-none',
                        'bg-white placeholder-neutral-500',
                        'border border-neutral-200 focus:border-black',
                        'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
                        error && 'border-rose-500 dark:border-rose-400',
                        isUploading && 'opacity-50'
                    )}
                    disabled={isUploading}
                    placeholder={isUploading ? t('uploading') : label}
                />

                {isUploading && <Spinner />}

                <textarea
                    {...registerUrl}
                    className="hidden"
                    placeholder={labelUrl}
                />

                {description && (
                    <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                        {description}
                    </p>
                )}

                {error && (
                    <p
                        className={classNames(
                            'text-rose-500 dark:text-rose-400',
                            'mt-2 text-sm'
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
