import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { useGetAllStoresQuery } from '@/features/stores/storesApi'
import { mockNavigate } from '@/tests/mocks/router'
import { StoreLinksAdd } from './StoreLinksAdd'

vi.mock('@/app/hooks')
vi.mock('@/features/stores/storesApi')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/components/navigation/NavBar')
vi.mock('@/shared/components/navigation/NavButton')

describe('StoreLinksAdd', () => {
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

    const mockOnSave = vi.fn().mockResolvedValue(undefined)

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue({
            storeLinks: [],
        })

        vi.mocked(useGetAllStoresQuery as Mock).mockReturnValue({
            data: mockStores,
        })
    })

    it('renders the page with correct title', () => {
        render(<StoreLinksAdd onSave={mockOnSave} />)

        const topPanel = screen.getByTestId('mocked-top-panel')
        expect(topPanel).toBeInTheDocument()
    })

    it('renders initial empty store link form', () => {
        render(<StoreLinksAdd onSave={mockOnSave} />)

        expect(screen.getByText('fields.stores.label')).toBeInTheDocument()
        expect(screen.getAllByPlaceholderText('fields.link.label').length).toBe(
            2
        )
    })

    it('initializes with existing store links from form data', async () => {
        vi.mocked(useAppSelector).mockReturnValue({
            storeLinks: [mockStoreLink],
        })

        render(<StoreLinksAdd onSave={mockOnSave} />)

        const linkInput = screen.getByRole('textbox', {
            name: 'fields.link.ariaLabel',
        }) as HTMLInputElement

        expect(linkInput.value).toBe('https://store1.com')
    })

    it('adds a new store link when plus button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        const addButton = screen.getByRole('button', {
            name: 'buttons.linkAdd.ariaLabel',
        })
        await user.click(addButton)

        const linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        })

        expect(linkInputs.length).toBe(2)
    })

    it('removes a store link when minus button is clicked', async () => {
        const user = userEvent.setup()

        vi.mocked(useAppSelector).mockReturnValue(mockFormData)

        render(<StoreLinksAdd onSave={mockOnSave} />)

        let linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        })

        expect(linkInputs.length).toBe(2)

        const deleteButtons = screen.getAllByRole('button', {
            name: 'buttons.linkDelete.ariaLabel',
        })

        const deleteStore1 = deleteButtons[0]
        await user.click(deleteStore1)

        linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        })

        expect(linkInputs.length).toBe(1)
    })

    it('updates store selection when select is changed', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        const select = screen.getByRole('combobox')
        await user.selectOptions(select, 'store1')

        const selectedOption = Array.from(
            select.querySelectorAll('option')
        ).find((option) => option.selected)

        expect(selectedOption?.value).toBe('store1')
        expect(selectedOption?.textContent).toBe('Store 1')
    })

    it('updates link value when input changes', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        const linkInput = screen.getByRole('textbox', {
            name: 'fields.link.ariaLabel',
        }) as HTMLInputElement

        await user.type(linkInput, 'https://example.com')

        expect(linkInput).toHaveValue('https://example.com')
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        const backButton = screen.getByRole('button', {
            name: 'navigation:actions.back',
        })
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves form data and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        await user.selectOptions(screen.getByRole('combobox'), 'store1')

        await user.type(
            screen.getByRole('textbox', {
                name: 'fields.link.ariaLabel',
            }) as HTMLInputElement,
            'https://example.com'
        )

        await user.click(
            screen.getByRole('button', {
                name: 'navigation:actions.save',
            })
        )

        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
})
