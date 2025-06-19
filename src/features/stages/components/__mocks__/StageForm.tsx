import { mockStage1 } from '../../__mocks__/stagesApi'
import { type StageFormProps } from '../StageForm'

export const StageForm = ({ title, onSubmit }: StageFormProps) => (
    <div data-testid="mocked-stage-form">
        <h2>{title}</h2>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockStage1)}
        >
            Submit
        </button>
    </div>
)
