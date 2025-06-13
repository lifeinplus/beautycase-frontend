import { vi } from 'vitest'

const mockIcon = (name: string) => () => <svg data-testid={`mocked-${name}`} />

const icons = {
    ArrowDownCircleIcon: mockIcon('arrow-down-circle-icon'),
    ArrowLeftIcon: mockIcon('arrow-left-icon'),
    ArrowLeftStartOnRectangleIcon: mockIcon(
        'arrow-left-start-on-rectangle-icon'
    ),
    ArrowRightEndOnRectangleIcon: mockIcon('arrow-right-end-on-rectangle-icon'),
    ArrowTopRightOnSquareIcon: mockIcon('arrow-top-right-on-square-icon'),
    CheckIcon: mockIcon('check-icon'),
    ChevronDownIcon: mockIcon('chevron-down-icon'),
    ChevronLeftIcon: mockIcon('chevron-left-icon'),
    ChevronRightIcon: mockIcon('chevron-right-icon'),
    ClipboardDocumentListIcon: mockIcon('clipboard-document-list-icon'),
    ClipboardIcon: mockIcon('clipboard-icon'),
    DocumentArrowDownIcon: mockIcon('document-arrow-down-icon'),
    DocumentDuplicateIcon: mockIcon('document-duplicate-icon'),
    EllipsisHorizontalCircleIcon: mockIcon('ellipsis-horizontal-circle-icon'),
    FilmIcon: mockIcon('film-icon'),
    ListBulletIcon: mockIcon('list-bullet-icon'),
    MinusCircleIcon: mockIcon('minus-circle-icon'),
    MoonIcon: mockIcon('moon-icon'),
    PaintBrushIcon: mockIcon('paint-brush-icon'),
    PencilSquareIcon: mockIcon('pencil-square-icon'),
    PhotoIcon: mockIcon('photo-icon'),
    PlusCircleIcon: mockIcon('plus-circle-icon'),
    PlusIcon: mockIcon('plus-icon'),
    QueueListIcon: mockIcon('queue-list-icon'),
    RectangleGroupIcon: mockIcon('rectangle-group-icon'),
    ShoppingBagIcon: mockIcon('shopping-bag-icon'),
    SunIcon: mockIcon('sun-icon'),
    TrashIcon: mockIcon('trash-icon'),
    UserCircleIcon: mockIcon('user-circle-icon'),
}

const mockIcons = () => {
    vi.mock('@heroicons/react/24/outline', () => icons)
    vi.mock('@heroicons/react/24/solid', () => icons)
}

export default mockIcons
