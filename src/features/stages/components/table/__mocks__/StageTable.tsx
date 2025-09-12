import { type StageTableProps } from '../StageTable'

export const StageTable = ({ stages }: StageTableProps) => (
    <div data-testid="mocked-stage-table">
        {stages?.map((s) => <div key={s._id}>{s.title}</div>)}
    </div>
)
