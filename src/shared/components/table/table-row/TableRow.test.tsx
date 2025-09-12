import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { mockNavigate } from '@/tests/mocks/router'
import { TableRow, type TableRowProps } from './TableRow'

describe('TableRow', () => {
    const renderTableRow = (props: TableRowProps) => {
        return render(
            <table>
                <tbody>
                    <TableRow {...props} />
                </tbody>
            </table>
        )
    }

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

        const cells = container.querySelectorAll("[class*='td']")

        cells.forEach((cell, index) => {
            expect(cell).toHaveClass(/td/)
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
            /actions/
        )
    })

    it('navigates when clicked with redirectPath', async () => {
        const user = userEvent.setup()
        const cellData = ['Name', 'Age', 'Email']
        const redirectPath = '/details/123'

        renderTableRow({ cellData, redirectPath })

        const row = screen.getByRole('row')
        await user.click(row)

        expect(mockNavigate).toHaveBeenCalledWith(redirectPath)
    })

    it('does not navigate when clicked without redirectPath', async () => {
        const user = userEvent.setup()
        const cellData = ['Name', 'Age', 'Email']

        renderTableRow({ cellData })

        const row = screen.getByRole('row')
        await user.click(row)

        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
