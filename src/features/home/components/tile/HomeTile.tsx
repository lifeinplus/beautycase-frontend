import classNames from 'classnames'
import { ComponentType, SVGProps } from 'react'
import { Link } from 'react-router-dom'

export interface HomeTileProps {
    to: string
    label: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const HomeTile = ({ to, label, icon: Icon }: HomeTileProps) => (
    <Link
        to={to}
        className={classNames(
            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
            'dark:focus-visible:outline-rose-700',
            'group flex min-h-44 w-full min-w-36 flex-col items-center bg-white px-5 pt-8 hover:bg-rose-500',
            'rounded-md border border-gray-200 hover:border-white',
            'dark:border-neutral-700 dark:bg-black dark:hover:border-white dark:hover:bg-rose-600'
        )}
    >
        <div className="text-neutral-700 group-hover:text-white dark:text-neutral-200">
            <Icon className="h-16 w-16 stroke-1" />
        </div>
        <span className="font-heading mt-8 text-center text-base leading-tight font-normal text-neutral-600 group-hover:text-white dark:text-neutral-300">
            {label}
        </span>
    </Link>
)
