import { type StageMobileViewProps } from '../StageMobileView'

export const StageMobileView = ({ stages }: StageMobileViewProps) => (
    <div data-testid="mocked-stage-mobile-view">
        {stages?.map((s) => <div key={s._id}>{s.title}</div>)}
    </div>
)
