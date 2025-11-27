import type { ComponentType, SVGProps } from 'react'

interface ModalProps {
    onConfirm: () => void | Promise<void>
    onCancel: () => void | Promise<void>
}

export interface NavBarAction {
    key: string
    className?: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
    onClick: () => void
    auth?: boolean
    roles?: string[]
    modalProps?: ModalProps
    destructive?: boolean
}
