import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import type {
    FieldValues,
    Path,
    PathValue,
    UseFormClearErrors,
    UseFormSetValue,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import {
    useDeleteImageMutation,
    useUploadTempImageMutation,
} from '@/features/uploads/api/uploadsApi'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { Label } from '../../label/Label'
import { ImagePreview } from '../preview/ImagePreview'
import { ImageUploadButton } from './ui/ImageUploadButton'
import { ImageUploadPlaceholder } from './ui/ImageUploadPlaceholder'

export interface ImageFilesSectionProps<T extends FieldValues> {
    clearErrors: UseFormClearErrors<T>
    folder: 'products' | 'stages' | 'tools'
    label: string
    name: Path<T>
    setValue: UseFormSetValue<T>
    error?: string
    required?: boolean
    value?: string[]
}

export const ImageFilesSection = <T extends FieldValues>({
    clearErrors,
    folder,
    label,
    name,
    setValue,
    error,
    required = false,
    value = [],
}: ImageFilesSectionProps<T>) => {
    const [imageIds, setImageIds] = useState<string[]>([])

    useEffect(() => {
        if (!value) return

        const newIds = Array.isArray(value) ? value : [value]
        const isSame =
            newIds.length === imageIds.length &&
            newIds.every((id, i) => id === imageIds[i])

        if (!isSame) {
            setImageIds(newIds)
        }
    }, [value])

    const [uploadTempImage, { isLoading: isUploading }] =
        useUploadTempImageMutation()

    const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation()

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (!files?.length) return

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
            setValue(name, updated as PathValue<T, Path<T>>)
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
            setValue(name, updated as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error('Image upload failed', error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div>
            <div
                className={classNames(
                    'flex justify-between',
                    imageIds.length ? 'flex-row items-center' : 'flex-col'
                )}
            >
                <Label required={required} text={label} />

                {imageIds.length ? (
                    <ImageUploadButton
                        isUploading={isUploading}
                        onUpload={handleUpload}
                    />
                ) : (
                    <ImageUploadPlaceholder
                        isUploading={isUploading}
                        onUpload={handleUpload}
                        error={error}
                    />
                )}
            </div>

            <div className="relative space-y-5">
                {error && (
                    <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                        {error}
                    </p>
                )}

                {imageIds.map((imageId) => (
                    <ImagePreview
                        key={imageId}
                        imageId={imageId}
                        onDelete={() => handleDelete(imageId)}
                        isLoading={isDeleting}
                    />
                ))}
            </div>
        </div>
    )
}
