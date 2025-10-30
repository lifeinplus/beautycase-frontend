import classNames from 'classnames'

export interface labelProps {
    id: string
    text: string
    error?: string
}

export const Label = ({ id, text, error }: labelProps) => (
    <label
        htmlFor={id}
        className={classNames(
            'pointer-events-none absolute start-4 -top-2.5 transform text-sm text-neutral-400 transition-all dark:text-neutral-600',
            'peer-placeholder-shown:start-4 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base',
            'peer-focus:start-4 peer-focus:-top-2.5 peer-focus:text-sm',
            'bg-white px-1 peer-focus:text-black dark:bg-black dark:peer-focus:text-white',
            error &&
                'text-rose-500 peer-placeholder-shown:text-neutral-400 dark:text-rose-400 peer-placeholder-shown:dark:text-neutral-600'
        )}
    >
        {error || text}
    </label>
)
