import { Mua } from '@/features/users/types'

import { getFullName } from '@/shared/utils/ui/getFullName'
import { NotSpecified } from './NotSpecified'

interface MuaFieldProps {
    mua?: Mua
}

export const MuaField = ({ mua }: MuaFieldProps) => {
    if (!mua) return <NotSpecified />
    return `${getFullName(mua.firstName, mua.lastName)} | @${mua.username}`
}
