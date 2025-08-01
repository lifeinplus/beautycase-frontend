import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
    afterAll,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    Mock,
    vi,
} from 'vitest'

import { mockDispatch } from '@/app/__mocks__/hooks'
import { useAppSelector } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import {
    mockStoreLink1,
    mockStoreLinks,
    mockStores,
} from '@/features/stores/__mocks__/storesApi'
import { useGetAllStoresQuery } from '@/features/stores/storesApi'
import { mockError } from '@/shared/utils/__mocks__/errorUtils'
import { mockNavigate } from '@/tests/mocks/router'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { StoreLinksAdd } from './StoreLinksAdd'

vi.mock('@/app/hooks')
vi.mock('@/features/form/formSlice')
vi.mock('@/features/stores/storesApi')
vi.mock('@/shared/components/common/TitleSection')
vi.mock('@/shared/components/forms/Button')
vi.mock('@/shared/components/layout/TopPanel')
vi.mock('@/shared/components/ui/ButtonSubmit')
vi.mock('@/shared/utils/errorUtils')

describe('StoreLinksAdd', () => {
    const mockFormData = {
        storeLinks: mockStoreLinks,
    }

    const mockOnSave = vi.fn().mockResolvedValue(undefined)
    const spyConsoleError = vi.spyOn(console, 'error')

    beforeAll(() => {
        spyConsoleError.mockImplementation(() => {})
    })

    beforeEach(() => {
        vi.mocked(useAppSelector).mockReturnValue({
            storeLinks: [],
        })

        vi.mocked(useGetAllStoresQuery as Mock).mockReturnValue({
            data: mockStores,
        })
    })

    afterAll(() => {
        spyConsoleError.mockRestore()
    })

    it('renders the page with correct title', () => {
        render(<StoreLinksAdd onSave={mockOnSave} />)
        expect(screen.getByTestId('mocked-top-panel')).toBeInTheDocument()
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
            storeLinks: [mockStoreLink1],
        })

        render(<StoreLinksAdd onSave={mockOnSave} />)

        const linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        }) as HTMLInputElement[]

        expect(linkInputs[0].value).toBe('https://store1.com')
    })

    it('adds a new store link when plus button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        await user.click(
            screen.getByRole('button', {
                name: 'buttons.linkAdd.ariaLabel',
            })
        )

        const linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        })

        expect(linkInputs.length).toBe(4)
    })

    it('removes a store link when minus button is clicked', async () => {
        const user = userEvent.setup()

        vi.mocked(useAppSelector).mockReturnValue(mockFormData)

        render(<StoreLinksAdd onSave={mockOnSave} />)

        let linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        })

        expect(linkInputs.length).toBe(4)

        const deleteButtons = screen.getAllByRole('button', {
            name: 'buttons.linkDelete.ariaLabel',
        })

        await user.click(deleteButtons[0])

        linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        })

        expect(linkInputs.length).toBe(2)
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

    it('updates link value when textarea changes', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        const linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        }) as HTMLInputElement[]

        const textarea = linkInputs[0]
        await user.type(textarea, 'https://example.com')

        expect(textarea).toHaveValue('https://example.com')
    })

    it('updates link value when input changes', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        const linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        }) as HTMLInputElement[]

        const input = linkInputs[1]
        await user.type(input, 'https://example.com')

        expect(input).toHaveValue('https://example.com')
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)
        await user.click(screen.getByTestId('mocked-back-button'))

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves form data and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoreLinksAdd onSave={mockOnSave} />)

        await user.selectOptions(screen.getByRole('combobox'), 'store1')

        const linkInputs = screen.getAllByRole('textbox', {
            name: 'fields.link.ariaLabel',
        }) as HTMLInputElement[]

        await user.type(linkInputs[0], 'https://example.com')
        await user.click(screen.getByTestId('mocked-button-submit'))

        expect(mockDispatch).toHaveBeenCalledWith(clearFormData())
        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('handles errors correctly when save fails', async () => {
        const user = userEvent.setup()
        mockOnSave.mockRejectedValue(mockError)

        render(<StoreLinksAdd onSave={mockOnSave} />)

        await user.click(screen.getByTestId('mocked-button-submit'))

        expect(mockOnSave).toHaveBeenCalled()
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)
    })

    it('does nothing if id is undefined in handleSave', async () => {
        const user = userEvent.setup()

        vi.mocked(useParams).mockReturnValue({})

        render(<StoreLinksAdd onSave={mockOnSave} />)

        await user.click(screen.getByTestId('mocked-button-submit'))

        expect(mockOnSave).not.toHaveBeenCalled()
        expect(mockDispatch).not.toHaveBeenCalled()
        expect(mockNavigate).not.toHaveBeenCalled()
    })

    it('shows saving label when isSaving is true', () => {
        render(<StoreLinksAdd onSave={mockOnSave} isSaving={true} />)

        expect(screen.getByTestId('mocked-button-submit')).toHaveTextContent(
            'navigation:actions.saving'
        )
    })
})
