import { mockProduct } from '../../__mocks__/productApiSlice'
import { type ProductFormProps } from '../ProductForm'

export const ProductForm = ({ title, onSubmit }: ProductFormProps) => (
    <div data-testid="mocked-product-form">
        <h2>{title}</h2>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockProduct)}
        >
            Submit
        </button>
    </div>
)
