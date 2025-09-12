import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { useLogoutUserMutation } from '../../api/authApi'
import { logout } from '../../slice/authSlice'

export const useAuthLogout = (redirectPath: string = '/') => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [logoutUser] = useLogoutUserMutation()

    const handleLogout = async () => {
        try {
            await logoutUser()
            dispatch(logout())
            navigate(redirectPath)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return handleLogout
}
