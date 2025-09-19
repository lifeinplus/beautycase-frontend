import { type MakeupBagToolsProps } from '../MakeupBagTools'

export const MakeupBagTools = ({ tools }: MakeupBagToolsProps) => (
    <div data-testid="mocked-makeup-bag-tools">{tools?.length} tools</div>
)
