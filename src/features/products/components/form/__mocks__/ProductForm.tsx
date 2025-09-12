import { mockProduct1 } from '../../../api/__mocks__/productsApi'
import { type ProductFormProps } from '../ProductForm'

export const ProductForm = ({ title, onSubmit }: ProductFormProps) => (
    <div data-testid="mocked-product-form">
        <h2>{title}</h2>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockProduct1)}
        >
            Submit
        </button>
    </div>
)
