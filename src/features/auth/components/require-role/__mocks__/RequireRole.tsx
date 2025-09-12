import { Outlet } from 'react-router-dom'

export const RequireRole = () => (
    <div data-testid="mocked-require-role">
        <Outlet />
    </div>
)
