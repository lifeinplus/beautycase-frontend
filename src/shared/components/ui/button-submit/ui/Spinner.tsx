import classNames from 'classnames'

interface SpinnerProps {
    className?: string
}

export const Spinner = ({ className }: SpinnerProps) => (
    <div
        className={classNames(
            'size-6 animate-spin rounded-full border-2 border-current border-t-transparent',
            className
        )}
    />
)
