import type { ComponentType, SVGProps } from 'react'

import type { ModalDeleteProps } from '@/shared/components/modals/delete/ModalDelete'

export interface NavBarAction {
    key: string
    className?: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
    label: string
    onClick: () => void
    auth?: boolean
    roles?: string[]
    modalProps?: ModalDeleteProps
}
