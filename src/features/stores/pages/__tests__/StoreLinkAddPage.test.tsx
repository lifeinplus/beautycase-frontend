import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, beforeEach, expect, Mock } from 'vitest'

import { mockDispatch } from '../../../../app/__mocks__/hooks'
import { useAppSelector } from '../../../../app/hooks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { setFormData } from '../../../form/formSlice'
import { useReadStoresQuery } from '../../storesApiSlice'
import { StoreLinkAddPage } from '../StoreLinkAddPage'

vi.mock('../../../../app/hooks')
vi.mock('../../../../components/navigation/AdaptiveNavBar')
vi.mock('../../../../components/navigation/NavigationButton')
vi.mock('../../../../components/TopPanel')
vi.mock('../../storesApiSlice')

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

        const topPanel = screen.getByTestId('mocked-top-panel')
        expect(topPanel).toBeInTheDocument()
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
        const user = userEvent.setup()

        render(<StoreLinkAddPage />)

        const addButton = screen.getByRole('button', { name: 'Add Button' })
        await user.click(addButton)

        const linkInputs = screen.getAllByRole('textbox', {
            name: 'Link Input',
        })

        expect(linkInputs.length).toBe(2)
    })

    it('removes a store link when minus button is clicked', async () => {
        const user = userEvent.setup()

        vi.mocked(useAppSelector).mockReturnValue(mockFormData)

        render(<StoreLinkAddPage />)

        let linkInputs = screen.getAllByRole('textbox', {
            name: 'Link Input',
        })

        expect(linkInputs.length).toBe(2)

        const deleteButtons = screen.getAllByRole('button', {
            name: 'Delete Button',
        })

        const deleteStore1 = deleteButtons[0]
        await user.click(deleteStore1)

        linkInputs = screen.getAllByRole('textbox', {
            name: 'Link Input',
        })

        expect(linkInputs.length).toBe(1)
    })

    it('updates store selection when select is changed', async () => {
        const user = userEvent.setup()

        render(<StoreLinkAddPage />)

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

        render(<StoreLinkAddPage />)

        const linkInput = screen.getByRole('textbox', {
            name: 'Link Input',
        }) as HTMLInputElement

        await user.type(linkInput, 'https://example.com')

        expect(linkInput).toHaveValue('https://example.com')
    })

    it('navigates back when back button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoreLinkAddPage />)

        const backButton = screen.getByRole('button', { name: 'Назад' })
        await user.click(backButton)

        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })

    it('saves form data and navigates back when save button is clicked', async () => {
        const user = userEvent.setup()

        render(<StoreLinkAddPage />)

        const select = screen.getByRole('combobox')
        await user.selectOptions(select, 'store1')

        const linkInput = screen.getByRole('textbox', {
            name: 'Link Input',
        }) as HTMLInputElement
        await user.type(linkInput, 'https://example.com')

        const saveButton = screen.getByRole('button', { name: 'Сохранить' })
        await user.click(saveButton)

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
