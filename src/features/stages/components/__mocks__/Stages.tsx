import { type StagesProps } from '../Stages'

export const Stages = ({ stages }: StagesProps) => (
    <div data-testid="mocked-stages">{stages?.length} stages</div>
)
