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
            'm-2 flex cursor-pointer rounded-lg p-1 transition-all hover:bg-neutral-200 md:m-0 md:my-1 md:p-3 lg:gap-4 dark:hover:bg-neutral-800',
            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700',
            className
        )}
    >
        <Icon className="h-7 w-7 md:h-6 md:w-6" />
        <span className="hidden lg:inline">{label}</span>
    </button>
)
