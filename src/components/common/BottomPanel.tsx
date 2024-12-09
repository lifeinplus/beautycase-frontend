import { ReactNode } from 'react'

interface BottomPanelProps {
    children: ReactNode
}

export const BottomPanel = ({ children }: BottomPanelProps) => {
    return <nav className="bottom-panel">{children}</nav>
}
