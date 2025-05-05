import { type ToolsProps } from '../Tools'

export const Tools = ({ tools }: ToolsProps) => (
    <div data-testid="mocked-tools">{tools?.length} tools</div>
)
