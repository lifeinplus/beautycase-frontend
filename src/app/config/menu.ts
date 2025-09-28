import {
    ClipboardDocumentListIcon,
    ClipboardIcon,
    ComputerDesktopIcon,
    FilmIcon,
    ListBulletIcon,
    PaintBrushIcon,
    QueueListIcon,
    RectangleGroupIcon,
    ShoppingBagIcon,
    UserCircleIcon,
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
        label: 'menu.questionnaire',
        path: '/questionnaire',
        icon: ClipboardIcon,
    },
    {
        label: 'menu.training',
        path: '/training',
        icon: ClipboardIcon,
    },
    {
        auth: true,
        label: 'menu.questionnaires',
        path: '/questionnaires',
        roles: ['admin', 'mua'],
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
