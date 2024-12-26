import {
    ArrowLeftStartOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { selectUsername } from '../authSlice'
import { useAuthLogout } from '../hooks/useAuthLogout'

export const AuthButton = () => {
    const navigate = useNavigate()
    const handleLogout = useAuthLogout('/login')
    const username = useAppSelector(selectUsername)

    const handleLogin = () => {
        navigate('/login')
    }

    return username ? (
        <button className="nav-btn nav-btn-common" onClick={handleLogout}>
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
            <span className="hidden lg:inline">Выйти</span>
        </button>
    ) : (
        <button className="nav-btn nav-btn-common" onClick={handleLogin}>
            <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
            <span className="hidden lg:inline">Войти</span>
        </button>
    )
}
