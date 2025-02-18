import { MobileView } from '../../../components'
import { type ReferenceList } from '../../referenceLists'

interface ReferenceListsMobileViewProps {
    referenceLists?: ReferenceList[]
}

export const ReferenceListsMobileView = ({
    referenceLists,
}: ReferenceListsMobileViewProps) => (
    <MobileView
        items={referenceLists}
        getTitle={(item) => item.name || ''}
        getLink={(item) => `/reference_lists/${item.id}`}
    />
)
