import { vi } from 'vitest'

const mockIcon = () => <svg data-testid="mocked-icon" />

const icons = {
    AdjustmentsHorizontalIcon: mockIcon,
    ArrowDownCircleIcon: mockIcon,
    ArrowDownTrayIcon: mockIcon,
    ArrowLeftIcon: mockIcon,
    ArrowLeftStartOnRectangleIcon: mockIcon,
    ArrowRightEndOnRectangleIcon: mockIcon,
    ArrowTopRightOnSquareIcon: mockIcon,
    CheckIcon: mockIcon,
    ChevronDownIcon: mockIcon,
    ChevronLeftIcon: mockIcon,
    ChevronRightIcon: mockIcon,
    ClipboardDocumentListIcon: mockIcon,
    ClipboardIcon: mockIcon,
    ComputerDesktopIcon: mockIcon,
    DocumentArrowDownIcon: mockIcon,
    DocumentDuplicateIcon: mockIcon,
    EllipsisHorizontalCircleIcon: mockIcon,
    ExclamationCircleIcon: mockIcon,
    FilmIcon: mockIcon,
    LanguageIcon: mockIcon,
    ListBulletIcon: mockIcon,
    MinusCircleIcon: mockIcon,
    MoonIcon: mockIcon,
    PaintBrushIcon: mockIcon,
    PencilSquareIcon: mockIcon,
    PhotoIcon: mockIcon,
    PlusCircleIcon: mockIcon,
    PlusIcon: mockIcon,
    QueueListIcon: mockIcon,
    RectangleGroupIcon: mockIcon,
    ShoppingBagIcon: mockIcon,
    SquaresPlusIcon: mockIcon,
    StarIcon: mockIcon,
    SunIcon: mockIcon,
    TrashIcon: mockIcon,
    UserCircleIcon: mockIcon,
    UsersIcon: mockIcon,
}

const mockIcons = () => {
    vi.mock('@heroicons/react/24/outline', () => icons)
    vi.mock('@heroicons/react/24/solid', () => icons)
}

export default mockIcons
