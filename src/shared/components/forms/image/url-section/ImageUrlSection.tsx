import { PhotoIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, ClipboardEvent, useEffect, useRef, useState } from 'react'
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

import {
    useUploadTempImageByFileMutation,
    useUploadTempImageByUrlMutation,
} from '@/features/uploads/api/uploadsApi'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { Label } from '../../label/Label'
import { ImagePreview } from '../preview/ImagePreview'
import { Spinner } from '../ui/Spinner'

export interface ImageUrlSectionProps<T extends FieldValues> {
    clearErrors: UseFormClearErrors<T>
    folder: 'products' | 'stages' | 'tools'
    label: string
    name: Path<T>
    register: UseFormRegisterReturn
    setValue: UseFormSetValue<T>
    description?: string
    error?: string
    required?: boolean
    value?: string
}

export const ImageUrlSection = <T extends FieldValues>({
    clearErrors,
    folder,
    label,
    name,
    register,
    setValue,
    description,
    error,
    required = false,
    value = '',
}: ImageUrlSectionProps<T>) => {
    const uploadRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation('form')

    const [imageUrl, setImageUrl] = useState<string>()
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        setImageUrl(value)
    }, [value])

    const [uploadTempImageByFile] = useUploadTempImageByFileMutation()
    const [uploadTempImageByUrl] = useUploadTempImageByUrlMutation()

    const isValidUrl = (string: string): boolean => {
        try {
            new URL(string)
            return true
        } catch (_) {
            return false
        }
    }

    const isImageUrl = (url: string): boolean => {
        const extensions = ['.jpg', '.jpeg', '.png', '.webp']
        const lowerUrl = url.toLowerCase()
        return extensions.some((ext) => lowerUrl.includes(ext))
    }

    const handleUploadByFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        setValue(name, '' as PathValue<T, Path<T>>)
        setIsUploading(true)

        try {
            const formData = new FormData()
            formData.append('folder', folder)
            formData.append('imageFile', file)

            const response = await uploadTempImageByFile(formData).unwrap()

            setImageUrl(response.imageUrl)
            setValue(name, response.imageUrl as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error('Image upload failed', error)
            toast.error(getErrorMessage(error))
        } finally {
            setIsUploading(false)
        }
    }

    const handleUploadByUrl = async (imageUrl: string) => {
        setIsUploading(true)

        try {
            const response = await uploadTempImageByUrl({
                folder,
                imageUrl,
            }).unwrap()

            setImageUrl(response.imageUrl)
            setValue(name, response.imageUrl as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error('Image upload failed', error)
            toast.error(getErrorMessage(error))
        } finally {
            setIsUploading(false)
        }
    }

    const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()

        const pastedText = e.clipboardData.getData('text')
        setImageUrl('')

        if (uploadRef.current) {
            uploadRef.current.value = ''
        }

        if (pastedText && isValidUrl(pastedText) && isImageUrl(pastedText)) {
            const target = e.target as HTMLTextAreaElement
            target.value = pastedText
            await handleUploadByUrl(pastedText)
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
                        ref={uploadRef}
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
                    onPaste={handlePaste}
                    placeholder={isUploading ? t('uploading') : label}
                />

                {isUploading && <Spinner />}

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

                {imageUrl && <ImagePreview url={imageUrl} />}
            </div>
        </div>
    )
}
