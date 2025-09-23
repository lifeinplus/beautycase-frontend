import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { useLogoutUserMutation } from '../../api/authApi'
import { logout } from '../../slice/authSlice'

export const useAuthLogout = (redirectPath: string = '/') => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [logoutUser] = useLogoutUserMutation()

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()
        } catch (error) {
            console.error('Logout request failed', error)
        } finally {
            dispatch(logout())
            navigate(redirectPath)
        }
    }

    return handleLogout
}
