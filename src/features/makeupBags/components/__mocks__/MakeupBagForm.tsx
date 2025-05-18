import { mockMakeupBag } from '../../__mocks__/makeupBagsApi'
import { type MakeupBagFormProps } from '../MakeupBagForm'

export const MakeupBagForm = ({ title, onSubmit }: MakeupBagFormProps) => (
    <div data-testid="mocked-makeup-bag-form">
        <h2>{title}</h2>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockMakeupBag)}
        >
            Submit
        </button>
    </div>
)
