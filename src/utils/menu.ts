import { useAppSelector } from '../app/hooks'
import { selectRole, selectUsername } from '../features/auth'

interface MenuItem {
    auth?: boolean
    label: string
    path: string
    roles?: string[]
}

export const canAccess = (item: MenuItem) => {
    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    if (!item.auth) return true
    if (!username) return false
    if (!item.roles) return true

    return role && item.roles.includes(role)
}

export const menuItems: MenuItem[] = [
    {
        label: 'Анкета',
        path: '/questionnaire',
    },
    {
        auth: true,
        label: 'Анкеты',
        path: '/questionnaires',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'Косметичка',
        path: '/makeup_bag',
    },
    {
        auth: true,
        label: 'Продукты',
        path: '/products',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'Инструменты',
        path: '/tools',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'Уроки',
        path: '/lessons',
    },
]
