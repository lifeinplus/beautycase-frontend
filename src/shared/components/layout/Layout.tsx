import { Outlet } from 'react-router-dom'

import { useNavBarActions } from '@/shared/hooks/useNavBarActions'
import { ModalDelete } from '../modals/ModalDelete'
import { NavBar } from '../navigation/NavBar'
import { NavButton } from '../navigation/NavButton'

export const Layout = () => {
    const navBarActions = useNavBarActions()
    const deleteAction = navBarActions.find((action) => action.key === 'delete')

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

            {deleteAction?.modalProps && (
                <ModalDelete
                    isOpen={deleteAction.modalProps.isOpen}
                    title={deleteAction.modalProps.title}
                    description={deleteAction.modalProps.description}
                    onConfirm={deleteAction.modalProps.onConfirm}
                    onCancel={deleteAction.modalProps.onCancel}
                />
            )}
        </>
    )
}
