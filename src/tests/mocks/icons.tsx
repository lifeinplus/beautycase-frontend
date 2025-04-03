import { vi } from 'vitest'

const mockIcon = (name: string) => () => <svg data-testid={name} />

const icons = {
    ArrowDownCircleIcon: mockIcon('arrow-down-circle-icon'),
    ArrowLeftIcon: mockIcon('arrow-left-icon'),
    ArrowLeftStartOnRectangleIcon: mockIcon(
        'arrow-left-start-on-rectangle-icon'
    ),
    ArrowRightEndOnRectangleIcon: mockIcon('arrow-right-end-on-rectangle-icon'),
    ChevronLeftIcon: mockIcon('chevron-left-icon'),
    ChevronRightIcon: mockIcon('chevron-right-icon'),
    ClipboardDocumentListIcon: mockIcon('clipboard-document-list-icon'),
    ClipboardIcon: mockIcon('clipboard-icon'),
    DocumentDuplicateIcon: mockIcon('document-duplicate-icon'),
    FilmIcon: mockIcon('film-icon'),
    ListBulletIcon: mockIcon('list-bullet-icon'),
    MoonIcon: mockIcon('moon-icon'),
    PaintBrushIcon: mockIcon('paint-brush-icon'),
    PencilSquareIcon: mockIcon('pencil-square-icon'),
    PlusCircleIcon: mockIcon('plus-circle-icon'),
    PlusIcon: mockIcon('plus-icon'),
    QueueListIcon: mockIcon('queue-list-icon'),
    RectangleGroupIcon: mockIcon('rectangle-group-icon'),
    ShoppingBagIcon: mockIcon('shopping-bag-icon'),
    SunIcon: mockIcon('sun-icon'),
    TrashIcon: mockIcon('trash-icon'),
    UserCircleIcon: mockIcon('user-circle-icon'),
}

export const mockIcons = () => {
    vi.mock('@heroicons/react/24/outline', () => icons)
    vi.mock('@heroicons/react/24/solid', () => icons)
}
