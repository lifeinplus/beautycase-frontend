import { MobileView } from '../../../components/table/MobileView'
import type { ReferenceList } from '../types'

interface ReferenceListsMobileViewProps {
    data?: ReferenceList[]
}

export const ReferenceListsMobileView = ({
    data,
}: ReferenceListsMobileViewProps) => (
    <MobileView
        items={data}
        getTitle={(item) => item.name || ''}
        getLink={(item) => `/reference_lists/${item.id}`}
    />
)
