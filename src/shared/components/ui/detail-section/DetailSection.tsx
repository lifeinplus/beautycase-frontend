import classNames from 'classnames'

type DetailSectionProps = {
    label?: string
    value?: string | null
    className?: string
}

export function DetailSection({
    label,
    value,
    className = '',
}: DetailSectionProps) {
    if (!value) return null

    return (
        <section className={classNames('my-3 px-4 text-base', className)}>
            <p>{label ? `${label}: ${value}` : value}</p>
        </section>
    )
}
