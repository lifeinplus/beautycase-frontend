import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export interface ApiErrorProps {
    text?: string
}

export const ApiError = ({ text }: ApiErrorProps) => (
    <div className="relative flex flex-col rounded-xl p-4 ring-2 ring-amber-500 dark:ring-amber-400">
        <h4 className="flex gap-2 text-base font-normal text-pretty text-amber-500 dark:text-amber-400">
            <ExclamationCircleIcon className="size-6" />
            {text}
        </h4>
    </div>
)
