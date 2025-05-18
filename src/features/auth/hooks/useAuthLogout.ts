import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { getErrorMessage } from '../../../utils/errorUtils'
import { useLogoutUserMutation } from '../authApi'
import { logout } from '../authSlice'

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
