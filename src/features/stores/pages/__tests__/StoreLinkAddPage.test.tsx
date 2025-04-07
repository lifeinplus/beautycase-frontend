import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { useAppSelector } from '../../../../app/hooks'
import { type AdaptiveNavBarProps } from '../../../../components/navigation/AdaptiveNavBar'
import { type TopPanelProps } from '../../../../components/TopPanel'
import { mockNavigate } from '../../../../tests/mocks/router'
import { mockDispatch } from '../../../../tests/mocks/app'
import { setFormData } from '../../../form/formSlice'
import { useReadStoresQuery } from '../../storesApiSlice'
import { StoreLinkAddPage } from '../StoreLinkAddPage'

vi.mock('../../../../components/TopPanel', () => ({
    TopPanel: ({ title, onBack }: TopPanelProps) => (
        <div data-testid="top-panel">
            <button data-testid="back-button" onClick={onBack}>
                Back
            </button>
            <h2>{title}</h2>
        </div>
    ),
}))

vi.mock('../../../../components/navigation/AdaptiveNavBar', () => ({
    AdaptiveNavBar: ({ children }: AdaptiveNavBarProps) => (
        <div data-testid="adaptive-navbar">{children}</div>
    ),
}))

vi.mock('../../storesApiSlice', () => ({
    useReadStoresQuery: vi.fn(),
}))

describe('StoreLinkAddPage', () => {
    const mockStoreLink = {
        _id: 'store1',
        name: 'Store 1',
        link: 'https://store1.com',
    }

    const mockStoreLinks = [
        mockStoreLink,
        { _id: 'store2', name: 'Store 2', link: 'https://store2.com' },
    ]

    const mockFormData = {
        storeLinks: mockStoreLinks,
    }

    const mockStores = [
        { _id: 'store1', name: 'Store 1' },
        { _id: 'store2', name: 'Store 2' },
    ]

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue({
            storeLinks: [],
        })

        vi.mocked(useReadStoresQuery as Mock).mockReturnValue({
            data: mockStores,
        })
    })

    it('renders the page with correct title', () => {
        render(<StoreLinkAddPage />)
        expect(screen.getByTestId('top-panel')).toBeInTheDocument()
    })

    it('renders initial empty store link form', () => {
        render(<StoreLinkAddPage />)

        expect(screen.getByText('Выбрать')).toBeInTheDocument()
        expect(screen.getAllByPlaceholderText('Ссылка').length).toBe(2)
    })

    it('initializes with existing store links from form data', async () => {
        vi.mocked(useAppSelector).mockReturnValue({
            storeLinks: [mockStoreLink],
        })

        render(<StoreLinkAddPage />)

        const linkInput = screen.getByRole('textbox', {
            name: 'Link Input',
        }) as HTMLInputElement

        expect(linkInput.value).toBe('https://store1.com')
    })

    it('adds a new store link when plus button is clicked', async () => {
        render(<StoreLinkAddPage />)

        const addButton = screen.getByRole('button', { name: 'Add Button' })

        await userEvent.click(addButton)

        const linkInputs = screen.getAllByRole('textbox', {
            name: 'Link Input',
        })

        expect(linkInputs.length).toBe(2)
    })

    it('removes a store link when minus button is clicked', async () => {
        vi.mocked(useAppSelector).mockReturnValue(mockFormData)

        render(<StoreLinkAddPage />)

        let linkInputs = screen.getAllByRole('textbox', {
            name: 'Link Input',
        })

        expect(linkInputs.length).toBe(2)

        const deleteButtons = screen.getAllByRole('button', {
            name: 'Delete Button',
        })

        await userEvent.click(deleteButtons[0])

        linkInputs = screen.getAllByRole('textbox', {
            name: 'Link Input',
        })

        expect(linkInputs.length).toBe(1)
    })

    it('updates store selection when select is changed', async () => {
        render(<StoreLinkAddPage />)

        const select = screen.getByRole('combobox')
        await userEvent.selectOptions(select, 'store1')

        const selectedOption = Array.from(
            select.querySelectorAll('option')
        ).find((option) => option.selected)

        expect(selectedOption?.value).toBe('store1')
        expect(selectedOption?.textContent).toBe('Store 1')
    })

    it('updates link value when input changes', async () => {
        render(<StoreLinkAddPage />)

        const linkInput = screen.getByRole('textbox', {
            name: 'Link Input',
        }) as HTMLInputElement

        await userEvent.type(linkInput, 'https://example.com')

        expect(linkInput).toHaveValue('https://example.com')
    })

    it('navigates back when back button is clicked', async () => {
        render(<StoreLinkAddPage />)

        const backButton = screen.getByText('Назад')
        await userEvent.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves form data and navigates back when save button is clicked', async () => {
        render(<StoreLinkAddPage />)

        const select = screen.getByRole('combobox')
        await userEvent.selectOptions(select, 'store1')

        const linkInput = screen.getByRole('textbox', {
            name: 'Link Input',
        }) as HTMLInputElement
        await userEvent.type(linkInput, 'https://example.com')

        const saveButton = screen.getByText('Сохранить')
        await userEvent.click(saveButton)

        expect(mockDispatch).toHaveBeenCalledWith(
            setFormData({
                ...mockFormData,
                storeLinks: [
                    expect.objectContaining({
                        _id: 'store1',
                        link: 'https://example.com',
                    }),
                ],
            })
        )

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
})
