import { type ModalDeleteProps } from '../../modals/ModalDelete'

export const ModalDelete = ({
    isOpen,
    onCancel,
    onConfirm,
}: ModalDeleteProps) =>
    isOpen && (
        <div data-testid="mocked-modal-delete">
            <button
                data-testid="mocked-modal-delete-confirm"
                onClick={onConfirm}
            >
                Confirm
            </button>
            <button data-testid="mocked-modal-delete-cancel" onClick={onCancel}>
                Cancel
            </button>
        </div>
    )
