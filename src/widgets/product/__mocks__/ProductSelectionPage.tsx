import { mockProductIds } from '@/features/products/__mocks__/productsApi'
import { ProductSelectionPageProps } from '../ProductSelectionPage'

export const ProductSelectionPage = ({ onSave }: ProductSelectionPageProps) => (
    <div data-testid="mocked-product-selection-page">
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSave('123', mockProductIds)}
        >
            Submit
        </button>
    </div>
)
