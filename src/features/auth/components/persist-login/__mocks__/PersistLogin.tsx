import { Outlet } from 'react-router-dom'

export const PersistLogin = () => {
    return (
        <div data-testid="mocked-persist-login">
            <Outlet />
        </div>
    )
}
