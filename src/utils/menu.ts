export interface AccessibleItem {
    auth?: boolean
    roles?: string[]
}

interface MenuItem {
    auth?: boolean
    label: string
    path: string
    roles?: string[]
}

export const canAccess = (
    item: AccessibleItem,
    username?: string,
    role?: string
): boolean => {
    if (!item.auth) return true
    if (!username) return false
    if (!item.roles) return true

    return !!role && item.roles.includes(role)
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
        label: 'Косметички',
        path: '/makeup_bags',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'Этапы',
        path: '/stages',
        roles: ['admin', 'mua'],
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
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'Справочники',
        path: '/reference_lists',
        roles: ['admin'],
    },
    {
        auth: true,
        label: 'Личный кабинет',
        path: '/account',
    },
]
