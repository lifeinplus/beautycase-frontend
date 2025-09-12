import { Outlet } from 'react-router-dom'

export const AppLayout = () => (
    <div data-testid="mocked-layout">
        <Outlet />
    </div>
)
