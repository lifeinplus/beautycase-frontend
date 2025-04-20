import { type ModalDeleteProps } from '../ModalDelete'

export const ModalDelete = ({ onCancel, onConfirm }: ModalDeleteProps) => {
    return (
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
}
