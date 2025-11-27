import classNames from 'classnames'
import {
    type ButtonHTMLAttributes,
    type ComponentType,
    type SVGProps,
} from 'react'

export interface NavButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
}

export const NavButton = ({
    className,
    icon: Icon,
    label,
    ...props
}: NavButtonProps) => (
    <button
        {...props}
        className={classNames(
            'flex cursor-pointer rounded-lg p-3 transition-all hover:bg-neutral-200 lg:gap-4 dark:hover:bg-neutral-800',
            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700',
            className
        )}
    >
        <Icon className="size-7 md:size-5" />
        <span className="hidden lg:inline">{label}</span>
    </button>
)
