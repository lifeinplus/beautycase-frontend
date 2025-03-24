import { vi } from 'vitest'

const icons = {
    ArrowLeftIcon: () => <div data-testid="arrow-left-icon" />,
    ChevronLeftIcon: () => <svg data-testid="chevron-left-icon" />,
    ChevronRightIcon: () => <div data-testid="chevron-right-icon" />,
    DocumentDuplicateIcon: () => <div data-testid="document-duplicate-icon" />,
    MoonIcon: () => <div data-testid="moon-icon" />,
    PencilSquareIcon: () => <div data-testid="pencil-square-icon" />,
    PlusIcon: () => <div data-testid="plus-icon" />,
    SunIcon: () => <div data-testid="sun-icon" />,
    TrashIcon: () => <div data-testid="trash-icon" />,
}

export const mockIcons = () => {
    vi.mock('@heroicons/react/24/outline', () => icons)
    vi.mock('@heroicons/react/24/solid', () => icons)
}
