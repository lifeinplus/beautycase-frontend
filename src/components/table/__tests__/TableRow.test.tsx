import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useNavigate } from 'react-router-dom'

import { renderTableRow } from '../../../tests'

const mockedNavigate = vi.fn()

vi.mocked(useNavigate).mockImplementation(() => mockedNavigate)

describe('TableRow Component', () => {
    it('renders with cell data', () => {
        const cellData = ['Name', 'Age', 'Email']

        renderTableRow({ cellData })

        cellData.forEach((data) => {
            expect(screen.getByText(data)).toBeInTheDocument()
        })
    })

    it('renders with custom cell classes', () => {
        const cellData = ['Name', 'Age', 'Email']
        const cellClasses = ['text-bold', 'text-center', 'text-right']

        const { container } = renderTableRow({ cellData, cellClasses })

        const cells = container.querySelectorAll('td')

        cells.forEach((cell, index) => {
            expect(cell).toHaveClass('td')
            expect(cell).toHaveClass(cellClasses[index])
        })
    })

    it('renders actions when provided', () => {
        const cellData = ['Name', 'Age', 'Email']
        const actions = <button>Delete</button>

        renderTableRow({ cellData, actions })

        expect(
            screen.getByRole('button', { name: 'Delete' })
        ).toBeInTheDocument()

        expect(screen.getByRole('cell', { name: 'Delete' })).toHaveClass(
            'td-actions'
        )
    })

    it('navigates when clicked with redirectPath', () => {
        const cellData = ['Name', 'Age', 'Email']
        const redirectPath = '/details/123'

        renderTableRow({ cellData, redirectPath })

        fireEvent.click(screen.getByRole('row'))
        expect(mockedNavigate).toHaveBeenCalledWith(redirectPath)
    })

    it('does not navigate when clicked without redirectPath', () => {
        const cellData = ['Name', 'Age', 'Email']

        renderTableRow({ cellData })

        fireEvent.click(screen.getByRole('row'))
        expect(mockedNavigate).not.toHaveBeenCalled()
    })
})
