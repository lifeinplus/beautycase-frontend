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

    return (
        <div>
            {username ? (
                <button
                    className="my-1 flex p-2 hover:text-rose-500 dark:hover:text-rose-400 sm:p-3 lg:gap-4"
                    onClick={handleLogout}
                >
                    <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Выйти</span>
                </button>
            ) : (
                <button
                    className="my-1 flex p-2 hover:text-rose-500 dark:hover:text-rose-400 sm:p-3 lg:gap-4"
                    onClick={handleLogin}
                >
                    <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Войти</span>
                </button>
            )}
        </div>
    )
}

export default AuthButton
