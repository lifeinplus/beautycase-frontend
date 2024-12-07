import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../app/hooks'
import { selectUsername } from '../features/auth'

export const HomePage = () => {
    const username = useAppSelector(selectUsername)

    return username ? (
        <Navigate to="/makeup_bag" replace />
    ) : (
        <Navigate to="/login" replace />
    )
}
