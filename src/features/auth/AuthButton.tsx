import {
    ArrowLeftStartOnRectangleIcon,
    ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getErrorMessage } from '../../utils'
import { useLogoutUserMutation } from './authApiSlice'
import { logout, selectUsername } from './authSlice'

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
            toast.error(getErrorMessage(error))
        }
    }

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

export default AuthButton
