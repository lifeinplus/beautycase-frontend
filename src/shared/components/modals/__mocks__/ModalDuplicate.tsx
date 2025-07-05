import { type ModalDuplicateProps } from '../../modals/ModalDuplicate'

export const ModalDuplicate = ({
    onCancel,
    onConfirm,
}: ModalDuplicateProps) => {
    return (
        <div data-testid="mocked-modal-duplicate">
            <button
                data-testid="mocked-modal-duplicate-confirm"
                onClick={onConfirm}
            >
                Confirm
            </button>
            <button
                data-testid="mocked-modal-duplicate-cancel"
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    )
}
