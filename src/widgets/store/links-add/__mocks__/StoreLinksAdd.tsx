import { mockStoreLinks } from '@/features/stores/api/__mocks__/storesApi'
import type { StoreLinksAddProps } from '../StoreLinksAdd'

export const StoreLinksAdd = ({ onSave }: StoreLinksAddProps) => (
    <div data-testid="mocked-store-links-add">
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSave('123', mockStoreLinks)}
        >
            Submit
        </button>
    </div>
)
