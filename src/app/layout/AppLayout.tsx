import { Outlet } from 'react-router-dom'

import { useNavBarActions } from '@/app/layout/hooks/nav-bar-actions/useNavBarActions'
import { NavBar } from '@/app/layout/nav-bar/NavBar'
import { ModalDelete } from '@/shared/components/modals/delete/ModalDelete'
import { ModalDuplicate } from '@/shared/components/modals/duplicate/ModalDuplicate'
import { NavButton } from '@/shared/components/navigation/nav-button/NavButton'
import { useAppSelector } from '../hooks/hooks'
import {
    selectDeleteModal,
    selectDuplicateModal,
} from '../ui/modals/modalsSlice'

export const AppLayout = () => {
    const navBarActions = useNavBarActions()

    const deleteModal = useAppSelector(selectDeleteModal)
    const duplicateModal = useAppSelector(selectDuplicateModal)

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
                    isOpen={deleteModal.isOpen}
                    title={deleteModal.title}
                    description={deleteModal.description}
                    isBlocked={deleteModal.isBlocked}
                    isLoading={deleteModal.isLoading}
                    onConfirm={deleteAction.modalProps.onConfirm}
                    onCancel={deleteAction.modalProps.onCancel}
                />
            )}

            {duplicateAction?.modalProps && (
                <ModalDuplicate
                    isOpen={duplicateModal.isOpen}
                    title={duplicateModal.title}
                    description={duplicateModal.description}
                    isBlocked={duplicateModal.isBlocked}
                    isLoading={duplicateModal.isLoading}
                    onConfirm={duplicateAction.modalProps.onConfirm}
                    onCancel={duplicateAction.modalProps.onCancel}
                />
            )}

            <Outlet />
        </>
    )
}
