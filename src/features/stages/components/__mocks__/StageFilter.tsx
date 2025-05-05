import { mockStage } from '../../__mocks__/stagesApiSlice'
import { type StageFilterProps } from '../StageFilter'

export const StageFilter = ({ onFilterChange }: StageFilterProps) => (
    <div data-testid="mocked-stage-filter">
        <button
            data-testid="mocked-filter-button"
            onClick={() => onFilterChange([mockStage])}
        >
            Filter
        </button>
    </div>
)
