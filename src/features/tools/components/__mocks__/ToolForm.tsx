import { mockTool1 } from '../../__mocks__/toolsApi'
import { type ToolFormProps } from '../ToolForm'

export const ToolForm = ({ title, onSubmit }: ToolFormProps) => (
    <div data-testid="mocked-tool-form">
        <h2>{title}</h2>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockTool1)}
        >
            Submit
        </button>
    </div>
)
