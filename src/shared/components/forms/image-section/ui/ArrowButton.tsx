import classNames from 'classnames'
import { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react'

export interface ArrowButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    className: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const ArrowButton = ({
    className,
    icon: Icon,
    ...props
}: ArrowButtonProps) => (
    <button
        {...props}
        className={classNames(
            'absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-neutral-500/40 p-2 text-white',
            className,
            'focus-visible:rounded-full focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700'
        )}
    >
        <Icon className="h-5 w-5 stroke-3" />
    </button>
)
