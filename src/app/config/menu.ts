import {
    AdjustmentsHorizontalIcon,
    ClipboardDocumentListIcon,
    ComputerDesktopIcon,
    StarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import { ComponentType, SVGProps } from 'react'

interface MenuItem {
    auth?: boolean
    label: string
    to: string
    roles?: string[]
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const menuItems: MenuItem[] = [
    {
        label: 'menu.questionnaires',
        to: '/questionnaires',
        icon: ClipboardDocumentListIcon,
    },
    {
        label: 'menu.pricing',
        to: '/pricing',
        icon: ComputerDesktopIcon,
    },
    {
        auth: true,
        label: 'menu.backstage',
        to: '/backstage',
        roles: ['admin'],
        icon: StarIcon,
    },
    {
        auth: true,
        label: 'menu.controlCenter',
        to: '/control-center',
        roles: ['admin'],
        icon: AdjustmentsHorizontalIcon,
    },
    {
        auth: true,
        label: 'menu.account',
        to: '/account',
        icon: UserCircleIcon,
    },
]
