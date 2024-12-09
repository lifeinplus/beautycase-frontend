import {
    ArrowLeftStartOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import { logout, selectUsername } from './authSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useLogoutUserMutation } from '.'

const AuthButton = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const username = useAppSelector(selectUsername)
    const [logoutUser] = useLogoutUserMutation()

    const handleLogout = async () => {
        try {
            await logoutUser()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = () => {
        navigate('/login')
    }

    return username ? (
        <button
            className="adaptive-nav-bar__button-common"
            onClick={handleLogout}
        >
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
            <span className="hidden lg:inline">Выйти</span>
        </button>
    ) : (
        <button
            className="adaptive-nav-bar__button-common"
            onClick={handleLogin}
        >
            <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
            <span className="hidden lg:inline">Войти</span>
        </button>
    )
}

export default AuthButton
