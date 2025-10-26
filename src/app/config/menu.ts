import {
    AdjustmentsHorizontalIcon,
    ClipboardDocumentListIcon,
    ComputerDesktopIcon,
    StarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import { ComponentType, SVGProps } from 'react'

import { ROUTES } from '@/shared/config/routes'

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
        to: ROUTES.questionnaires.root,
        icon: ClipboardDocumentListIcon,
    },
    {
        label: 'menu.pricing',
        to: ROUTES.pricing,
        icon: ComputerDesktopIcon,
    },
    {
        auth: true,
        label: 'menu.backstage',
        to: ROUTES.backstage.root,
        roles: ['admin'],
        icon: StarIcon,
    },
    {
        auth: true,
        label: 'menu.controlCenter',
        to: ROUTES.controlCenter.root,
        roles: ['admin'],
        icon: AdjustmentsHorizontalIcon,
    },
    {
        auth: true,
        label: 'menu.account',
        to: ROUTES.account,
        icon: UserCircleIcon,
    },
]
