import { ReactNode } from 'react'

interface BottomPanelProps {
    children: ReactNode
}

export const BottomPanel = ({ children }: BottomPanelProps) => {
    return <nav className="panel-bottom">{children}</nav>
}
