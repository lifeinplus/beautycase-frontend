import classNames from 'classnames'

export interface LinkProps {
    url: string
    text: string
}

export const Link = ({ url, text }: LinkProps) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(
            'text-rose-500 transition-all dark:text-rose-400',
            'hover:rounded hover:outline-4 hover:outline-offset-4 hover:outline-rose-400 hover:outline-dashed dark:hover:outline-rose-600',
            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700'
        )}
    >
        {text}
    </a>
)
