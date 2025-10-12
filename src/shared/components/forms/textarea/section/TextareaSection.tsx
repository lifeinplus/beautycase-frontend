import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { getThumbnail } from '@/shared/utils/youtube/thumbnail/getThumbnail'
import { ImagePreview } from '../../image/preview/ImagePreview'
import { Label } from '../../label/Label'

export interface TextareaSectionProps {
    label: string
    register: UseFormRegisterReturn
    description?: string
    error?: string
    preview?: boolean
    required?: boolean
    rows?: number
    value?: string
}

export const TextareaSection = ({
    label,
    register,
    description,
    error,
    preview = false,
    required = false,
    rows,
    value = '',
}: TextareaSectionProps) => (
    <div>
        <Label required={required} text={label}>
            <textarea
                {...register}
                className={classNames(
                    'peer block w-full rounded-xl px-4 py-2.5 focus:outline-none',
                    'bg-white placeholder-neutral-500',
                    'border border-neutral-200 focus:border-black',
                    'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
                    error && 'border-rose-500 dark:border-rose-400'
                )}
                placeholder={label}
                rows={rows}
            />

            {preview && value && (
                <ImagePreview
                    url={
                        register.name === 'videoUrl'
                            ? getThumbnail(value)
                            : value
                    }
                />
            )}
        </Label>

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
    </div>
)
