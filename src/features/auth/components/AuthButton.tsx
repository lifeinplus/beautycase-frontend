import {
    ArrowLeftStartOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { selectUsername } from '../authSlice'
import { useAuthLogout } from '../hooks/useAuthLogout'

export const AuthButton = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('auth')

    const handleLogout = useAuthLogout('/login')
    const username = useAppSelector(selectUsername)

    const handleLogin = () => {
        navigate('/login')
    }

    return username ? (
        <button
            aria-label="Logout"
            className="nav-btn nav-btn-common focus-outline"
            onClick={handleLogout}
        >
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
            <span className="hidden lg:inline">{t('logout')}</span>
        </button>
    ) : (
        <button
            aria-label="Login"
            className="nav-btn nav-btn-common focus-outline"
            onClick={handleLogin}
        >
            <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
            <span className="hidden lg:inline">{t('login')}</span>
        </button>
    )
}
