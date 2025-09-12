import { Outlet } from 'react-router-dom'

export const RequireAuth = () => (
    <div data-testid="mocked-require-auth">
        <Outlet />
    </div>
)
