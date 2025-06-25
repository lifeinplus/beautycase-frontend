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
        label: 'menu.questionnaire',
        path: '/questionnaire',
    },
    {
        auth: true,
        label: 'menu.questionnaires',
        path: '/questionnaires',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'menu.makeupBags',
        path: '/makeup_bags',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'menu.stages',
        path: '/stages',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'menu.products',
        path: '/products',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'menu.tools',
        path: '/tools',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'menu.lessons',
        path: '/lessons',
        roles: ['admin', 'mua'],
    },
    {
        auth: true,
        label: 'menu.referenceLists',
        path: '/reference_lists',
        roles: ['admin'],
    },
    {
        auth: true,
        label: 'menu.account',
        path: '/account',
    },
]
