import { mockStage1 } from '../../../api/__mocks__/stagesApi'
import { type StageFilterProps } from '../StageFilter'

export const StageFilter = ({ onFilterChange }: StageFilterProps) => (
    <div data-testid="mocked-stage-filter">
        <button
            data-testid="mocked-filter-button"
            onClick={() => onFilterChange([mockStage1])}
        >
            Filter
        </button>
    </div>
)
