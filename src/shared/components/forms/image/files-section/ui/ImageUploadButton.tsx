import { PlusCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useRef } from 'react'

export interface ImageUploadButtonProps {
    isUploading: boolean
    onUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

export const ImageUploadButton = ({
    isUploading,
    onUpload,
}: ImageUploadButtonProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click()
        }
    }

    return (
        <button
            aria-label="Upload images"
            className={classNames(
                'flex items-center',
                'focus-visible:rounded-full focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700',
                isUploading ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
            disabled={isUploading}
            onClick={handleClick}
            type="button"
        >
            <PlusCircleIcon
                className={classNames(
                    'h-7 w-7 text-black dark:text-white',
                    isUploading
                        ? 'animate-spin opacity-50'
                        : 'animate-none hover:opacity-80'
                )}
            />

            <input
                ref={fileInputRef}
                accept="image/*,.heic"
                className="hidden"
                disabled={isUploading}
                onChange={onUpload}
                type="file"
                multiple
            />
        </button>
    )
}
