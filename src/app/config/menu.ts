import {
    ClipboardDocumentListIcon,
    ComputerDesktopIcon,
    FilmIcon,
    ListBulletIcon,
    PaintBrushIcon,
    QueueListIcon,
    RectangleGroupIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import { ComponentType, SVGProps } from 'react'

interface MenuItem {
    auth?: boolean
    label: string
    path: string
    roles?: string[]
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const menuItems: MenuItem[] = [
    {
        label: 'menu.questionnaires',
        path: '/questionnaires',
        icon: ClipboardDocumentListIcon,
    },
    {
        auth: true,
        label: 'menu.makeupBags',
        path: '/makeup-bags',
        roles: ['admin', 'mua'],
        icon: ShoppingBagIcon,
    },
    {
        auth: true,
        label: 'menu.stages',
        path: '/stages',
        roles: ['admin', 'mua'],
        icon: QueueListIcon,
    },
    {
        auth: true,
        label: 'menu.products',
        path: '/products',
        roles: ['admin', 'mua'],
        icon: RectangleGroupIcon,
    },
    {
        auth: true,
        label: 'menu.tools',
        path: '/tools',
        roles: ['admin', 'mua'],
        icon: PaintBrushIcon,
    },
    {
        auth: true,
        label: 'menu.lessons',
        path: '/lessons',
        roles: ['admin', 'mua'],
        icon: FilmIcon,
    },
    {
        auth: true,
        label: 'menu.referenceLists',
        path: '/reference-lists',
        roles: ['admin'],
        icon: ListBulletIcon,
    },
    {
        auth: true,
        label: 'menu.users',
        path: '/users',
        roles: ['admin'],
        icon: UsersIcon,
    },
    {
        label: 'menu.pricing',
        path: '/pricing',
        icon: ComputerDesktopIcon,
    },
    {
        auth: true,
        label: 'menu.account',
        path: '/account',
        icon: UserCircleIcon,
    },
]
