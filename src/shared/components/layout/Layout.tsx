import { Outlet } from 'react-router-dom'

import { useNavBarActions } from '@/shared/hooks/useNavBarActions'
import { NavBar } from '../navigation/NavBar'
import { NavButton } from '../navigation/NavButton'

export const Layout = () => {
    const navBarActions = useNavBarActions()

    return (
        <>
            <Outlet />
            <NavBar>
                {navBarActions.map(
                    ({ key, className, icon, label, onClick }) => (
                        <NavButton
                            key={key}
                            className={className}
                            icon={icon}
                            label={label}
                            onClick={onClick}
                        />
                    )
                )}
            </NavBar>
        </>
    )
}
