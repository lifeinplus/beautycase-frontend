interface AccessibleItem {
    auth?: boolean
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
