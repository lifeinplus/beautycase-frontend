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

import {
    useDeleteImageMutation,
    useUploadTempImageMutation,
} from '@/features/uploads/api/uploadsApi'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { Label } from '../../label/Label'
import { ImagePreview } from '../../preview/image/ImagePreview'
import { ImageUploadButton } from '../ui/ImageUploadButton'

export interface ImageTextSectionProps<T extends FieldValues> {
    clearErrors: UseFormClearErrors<T>
    folder: 'products' | 'questionnaires' | 'stages' | 'tools'
    label: string
    name: Path<T>
    nameIds: Path<T>
    register: UseFormRegisterReturn
    setValue: UseFormSetValue<T>
    description?: string
    error?: string
    required?: boolean
    value?: string
}

export const ImageTextSection = <T extends FieldValues>({
    clearErrors,
    folder,
    label,
    name,
    nameIds,
    register,
    setValue,
    description,
    error,
    required = false,
    value = '',
}: ImageTextSectionProps<T>) => {
    const { t } = useTranslation('form')
    const [imageIds, setImageIds] = useState<string[]>([])

    const [uploadTempImage, { isLoading: isUploading }] =
        useUploadTempImageMutation()

    const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation()

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files?.length) return

        function fallbackText(value: string) {
            const text = `[${t('photoAttached')}]`
            return value ? value : text
        }

        try {
            const uploadedIds: string[] = []

            for (const file of files) {
                const formData = new FormData()
                formData.append('folder', folder)
                formData.append('imageFile', file)

                const response = await uploadTempImage(formData).unwrap()
                uploadedIds.push(response.imageId)
            }

            const updated = [...imageIds, ...uploadedIds]
            setImageIds(updated)
            setValue(name, fallbackText(value) as PathValue<T, Path<T>>)
            setValue(nameIds, updated as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error('Image upload failed', error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleDelete = async (imageId: string) => {
        try {
            await deleteImage(imageId).unwrap()

            const updated = imageIds.filter((id) => id !== imageId)
            setImageIds(updated)
            setValue(nameIds, updated as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error('Image upload failed', error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Label required={required} text={label} />

                <ImageUploadButton
                    isUploading={isUploading}
                    onUpload={handleUpload}
                    multiple={true}
                />
            </div>

            <div className="relative">
                <textarea
                    {...register}
                    className={classNames(
                        'peer block w-full rounded-xl border bg-white px-4 py-2.5 placeholder-neutral-400 focus:border-black focus:outline-none dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
                        error
                            ? 'border-rose-500 dark:border-rose-400'
                            : 'border-neutral-200 dark:border-neutral-700',
                        isUploading ? 'cursor-not-allowed' : 'cursor-auto'
                    )}
                    disabled={isUploading}
                    placeholder={isUploading ? t('uploading') : label}
                />

                {description && (
                    <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                        {description}
                    </p>
                )}

                {error && (
                    <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                        {error}
                    </p>
                )}

                {imageIds.map((imageId) => (
                    <ImagePreview
                        key={imageId}
                        className="mt-5"
                        imageId={imageId}
                        isLoading={isDeleting}
                        onDelete={() => handleDelete(imageId)}
                    />
                ))}
            </div>
        </div>
    )
}
