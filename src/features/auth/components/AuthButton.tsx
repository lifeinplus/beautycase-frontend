import {
    ArrowLeftStartOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { NavButton } from '../../../components/navigation/NavButton'
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

    return (
        <NavButton
            icon={
                username
                    ? ArrowLeftStartOnRectangleIcon
                    : ArrowRightEndOnRectangleIcon
            }
            label={username ? t('logout') : t('login')}
            ariaLabel={username ? t('buttonLogout') : t('buttonLogin')}
            onClick={username ? handleLogout : handleLogin}
        />
    )
}
