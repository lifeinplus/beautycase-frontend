import { type ModalDuplicateProps } from '../../modals/ModalDuplicate'

export const ModalDuplicate = ({
    isOpen,
    onCancel,
    onConfirm,
}: ModalDuplicateProps) =>
    isOpen && (
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
