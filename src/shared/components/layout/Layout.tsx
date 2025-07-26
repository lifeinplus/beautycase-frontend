import { Outlet } from 'react-router-dom'

import { useNavBarActions } from '@/shared/hooks/useNavBarActions'
import { ModalDelete } from '../modals/ModalDelete'
import { ModalDuplicate } from '../modals/ModalDuplicate'
import { NavBar } from '../navigation/NavBar'
import { NavButton } from '../navigation/NavButton'

export const Layout = () => {
    const navBarActions = useNavBarActions()

    const deleteAction = navBarActions.find((a) => a.key === 'delete')
    const duplicateAction = navBarActions.find((a) => a.key === 'duplicate')

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

            {duplicateAction?.modalProps && (
                <ModalDuplicate
                    isOpen={duplicateAction.modalProps.isOpen}
                    title={duplicateAction.modalProps.title}
                    description={duplicateAction.modalProps.description}
                    onConfirm={duplicateAction.modalProps.onConfirm}
                    onCancel={duplicateAction.modalProps.onCancel}
                />
            )}
        </>
    )
}
