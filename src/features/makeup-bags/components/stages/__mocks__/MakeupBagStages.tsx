import { type MakeupBagStagesProps } from '../MakeupBagStages'

export const MakeupBagStages = ({ stages }: MakeupBagStagesProps) => (
    <div data-testid="mocked-makeup-bag-stages">{stages?.length} stages</div>
)
