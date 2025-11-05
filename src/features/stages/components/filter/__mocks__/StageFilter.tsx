import type { StageFilterProps } from '../StageFilter'

export const StageFilter = ({ onSelectMakeupBag }: StageFilterProps) => (
    <div data-testid="mocked-stage-filter">
        <button
            data-testid="mocked-filter-button"
            onClick={() => onSelectMakeupBag('111')}
        >
            Filter
        </button>
    </div>
)
