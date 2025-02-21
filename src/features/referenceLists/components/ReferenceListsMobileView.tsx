import { MobileView } from '../../../components'
import { type ReferenceList } from '../../referenceLists'

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
