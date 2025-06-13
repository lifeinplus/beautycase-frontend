import { PhotoIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, ClipboardEvent, useEffect, useState } from 'react'
import {
    type FieldError,
    type FieldValues,
    type Path,
    type PathValue,
    type UseFormClearErrors,
    type UseFormRegisterReturn,
    type UseFormSetValue,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { getErrorMessage } from '../../../utils/errorUtils'
import {
    useUploadTempImageByFileMutation,
    useUploadTempImageByUrlMutation,
} from '../../uploads/uploadsApi'
import { ImagePreview } from './ImagePreview'
import { Label } from './Label'

export interface ImageUrlSectionProps<T extends FieldValues> {
    clearErrors: UseFormClearErrors<T>
    folder: 'products' | 'stages' | 'tools'
    label: string
    name: Path<T>
    register: UseFormRegisterReturn
    setValue: UseFormSetValue<T>
    description?: string
    error?: FieldError
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
            console.error(error)
            toast.error(getErrorMessage(error))
        } finally {
            setIsUploading(false)
        }
    }

    const handleUploadByUrl = async (imageUrl: string) => {
        if (!isValidUrl(imageUrl) || !isImageUrl(imageUrl)) {
            return
        }

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
            console.error(error)
            toast.error(getErrorMessage(error))
        } finally {
            setIsUploading(false)
        }
    }

    const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        const pastedText = e.clipboardData.getData('text')

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
                        'cursor-pointer',
                        isUploading && 'cursor-not-allowed opacity-50'
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
                        className={classNames(
                            'form-input hidden',
                            error && 'border-error'
                        )}
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
                        'form-input',
                        'peer',
                        error && 'border-error',
                        isUploading && 'opacity-50'
                    )}
                    disabled={isUploading}
                    onPaste={handlePaste}
                    placeholder={isUploading ? 'Загрузка...' : label}
                />

                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white bg-opacity-10">
                        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-rose-500"></div>
                    </div>
                )}
            </div>

            {description && <p className="form-description">{description}</p>}

            {error && <p className="form-error">{error.message}</p>}

            {imageUrl && <ImagePreview url={imageUrl} />}
        </div>
    )
}
