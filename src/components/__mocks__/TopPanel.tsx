import { type TopPanelProps } from '../TopPanel'

export const TopPanel = ({ title, onBack }: TopPanelProps) => (
    <div data-testid="mocked-top-panel">
        <button data-testid="mocked-back-button" onClick={onBack}>
            Back
        </button>
        <h2>{title}</h2>
    </div>
)
