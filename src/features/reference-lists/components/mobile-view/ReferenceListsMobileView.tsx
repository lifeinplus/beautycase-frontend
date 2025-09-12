import { MobileView } from '@/shared/components/table/mobile-view/MobileView'
import type { ReferenceList } from '../../types'

export interface ReferenceListsMobileViewProps {
    data?: ReferenceList[]
}

export const ReferenceListsMobileView = ({
    data,
}: ReferenceListsMobileViewProps) => (
    <MobileView
        items={data}
        getTitle={(item) => item.name || ''}
        getLink={(item) => `/reference-lists/${item.id}`}
    />
)
