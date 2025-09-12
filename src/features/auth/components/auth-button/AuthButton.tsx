import {
    ArrowLeftStartOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { NavButton } from '@/shared/components/navigation/nav-button/NavButton'
import { useAuthLogout } from '../../hooks/auth-logout/useAuthLogout'
import { selectUsername } from '../../slice/authSlice'

export const AuthButton = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('auth')

    const handleLogout = useAuthLogout('/login')
    const username = useAppSelector(selectUsername)

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <NavButton
            aria-label={
                username
                    ? t('buttons.logout.ariaLabel')
                    : t('buttons.login.ariaLabel')
            }
            icon={
                username
                    ? ArrowLeftStartOnRectangleIcon
                    : ArrowRightEndOnRectangleIcon
            }
            label={username ? t('logout') : t('login')}
            onClick={username ? handleLogout : handleLogin}
        />
    )
}
