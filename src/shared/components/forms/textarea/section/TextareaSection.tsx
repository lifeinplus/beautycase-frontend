import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { getThumbnail } from '@/shared/utils/youtube/thumbnail/getThumbnail'
import { Label } from '../../label/Label'
import { VideoPreview } from '../../preview/video/VideoPreview'

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
                    'peer block w-full rounded-xl border bg-white px-4 py-2.5 placeholder-neutral-400 focus:border-black focus:outline-none dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white',
                    error
                        ? 'border-rose-500 dark:border-rose-400'
                        : 'border-neutral-200 dark:border-neutral-700'
                )}
                placeholder={label}
                rows={rows}
            />

            {preview && value && (
                <VideoPreview
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
            <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                {error}
            </p>
        )}
    </div>
)
