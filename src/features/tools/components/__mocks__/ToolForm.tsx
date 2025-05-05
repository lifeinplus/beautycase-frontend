import { mockTool } from '../../__mocks__/toolsApiSlice'
import { type ToolFormProps } from '../ToolForm'

export const ToolForm = ({ title, onSubmit }: ToolFormProps) => (
    <div data-testid="mocked-tool-form">
        <h2>{title}</h2>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockTool)}
        >
            Submit
        </button>
    </div>
)
