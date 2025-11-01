import { Mua } from '@/features/users/types'

import { NotSpecified } from './NotSpecified'

interface MuaFieldProps {
    mua?: Mua
}

export const MuaField = ({ mua }: MuaFieldProps) => {
    if (!mua) return <NotSpecified />
    return `${mua.firstName} ${mua.lastName} | @${mua.username}`
}
