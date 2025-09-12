import { mockProductIds } from '@/features/products/api/__mocks__/productsApi'
import type { ProductSelectionProps } from '../ProductSelection'

export const ProductSelection = ({ onSave }: ProductSelectionProps) => (
    <div data-testid="mocked-product-selection">
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSave('123', mockProductIds)}
        >
            Submit
        </button>
    </div>
)
