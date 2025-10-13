import { Outlet } from 'react-router-dom'

import { useNavBarActions } from '@/app/layout/hooks/nav-bar-actions/useNavBarActions'
import { NavBar } from '@/app/layout/nav-bar/NavBar'
import { ModalDelete } from '@/shared/components/modals/delete/ModalDelete'
import { ModalDuplicate } from '@/shared/components/modals/duplicate/ModalDuplicate'
import { NavButton } from '@/shared/components/navigation/nav-button/NavButton'

export const AppLayout = () => {
    const navBarActions = useNavBarActions()

    const deleteAction = navBarActions.find((a) => a.key === 'delete')
    const duplicateAction = navBarActions.find((a) => a.key === 'duplicate')

    return (
        <>
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
                    isBlocked={deleteAction.modalProps.isBlocked}
                    isLoading={deleteAction.modalProps.isLoading}
                />
            )}

            {duplicateAction?.modalProps && (
                <ModalDuplicate
                    isOpen={duplicateAction.modalProps.isOpen}
                    title={duplicateAction.modalProps.title}
                    description={duplicateAction.modalProps.description}
                    onConfirm={duplicateAction.modalProps.onConfirm}
                    onCancel={duplicateAction.modalProps.onCancel}
                    isBlocked={duplicateAction.modalProps.isBlocked}
                    isLoading={duplicateAction.modalProps.isLoading}
                />
            )}

            <Outlet />
        </>
    )
}
