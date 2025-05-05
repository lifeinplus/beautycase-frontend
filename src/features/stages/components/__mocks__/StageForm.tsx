import { mockStage } from '../../__mocks__/stagesApiSlice'
import { type StageFormProps } from '../StageForm'

export const StageForm = ({ title, onSubmit }: StageFormProps) => (
    <div data-testid="mocked-stage-form">
        <h2>{title}</h2>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockStage)}
        >
            Submit
        </button>
    </div>
)
