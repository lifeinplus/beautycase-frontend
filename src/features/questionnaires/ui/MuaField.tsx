import { Mua } from '@/features/users/types'

import { fullNameWithUsername } from '@/shared/utils/ui/fullNameWithUsername'
import { NotSpecified } from './NotSpecified'

interface MuaFieldProps {
    mua?: Mua
}

export const MuaField = ({ mua }: MuaFieldProps) => {
    if (!mua) return <NotSpecified />
    return fullNameWithUsername(mua.firstName, mua.lastName, mua.username)
}
