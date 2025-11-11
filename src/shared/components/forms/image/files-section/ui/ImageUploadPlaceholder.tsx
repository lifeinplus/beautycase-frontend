import { PlusCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useRef } from 'react'

export interface ImageUploadPlaceholderProps {
    isUploading: boolean
    onUpload: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export const ImageUploadPlaceholder = ({
    isUploading,
    onUpload,
    error,
}: ImageUploadPlaceholderProps) => {
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
                'flex w-full justify-center rounded-xl border border-dashed py-1.75',
                'focus:border-black focus:outline-none dark:focus:border-white',
                isUploading ? 'cursor-not-allowed' : 'cursor-pointer',
                error
                    ? 'border-rose-500 dark:border-rose-400'
                    : 'border-neutral-200 dark:border-neutral-700'
            )}
            disabled={isUploading}
            onClick={handleClick}
            type="button"
        >
            <PlusCircleIcon
                className={classNames(
                    'h-14 w-14 stroke-[0.5] text-black dark:text-white',
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
