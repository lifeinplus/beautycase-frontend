import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Header } from '@/shared/types/table'
import { Table } from '../Table'

interface TestItem {
    id: number
    name: string
    age: number
}

describe('Table', () => {
    const headers: Header[] = [
        { label: 'Name', className: 'name-column' },
        { label: 'Age', className: 'age-column' },
    ]

    const mockData: TestItem[] = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
    ]

    const renderRow = (item: TestItem) => (
        <tr key={item.id} data-testid={`mocked-row-${item.id}`}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
        </tr>
    )

    it('renders table headers correctly', () => {
        render(
            <Table headers={headers} data={mockData} renderRow={renderRow} />
        )

        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Age')).toBeInTheDocument()

        const name = screen.getByText('Name')
        expect(name).toHaveClass(/th/)
        expect(name).toHaveClass('name-column')

        const age = screen.getByText('Age')
        expect(age).toHaveClass(/th/)
        expect(age).toHaveClass('age-column')
    })

    it('renders table rows correctly', () => {
        render(
            <Table headers={headers} data={mockData} renderRow={renderRow} />
        )

        mockData.forEach((item) => {
            expect(
                screen.getByTestId(`mocked-row-${item.id}`)
            ).toBeInTheDocument()

            expect(screen.getByText(item.name)).toBeInTheDocument()

            expect(screen.getByText(item.age.toString())).toBeInTheDocument()
        })
    })

    it('renders empty table body when data is undefined', () => {
        render(<Table headers={headers} renderRow={renderRow} />)

        headers.forEach((header) => {
            expect(screen.getByText(header.label)).toBeInTheDocument()
        })

        expect(screen.queryByTestId(/row-/)).not.toBeInTheDocument()
    })

    it('applies the correct classes to the table', () => {
        const { container } = render(
            <Table headers={headers} data={mockData} renderRow={renderRow} />
        )

        expect(
            container.querySelector("[class*='container']")
        ).toBeInTheDocument()

        expect(container.querySelector("[class*='table']")).toBeInTheDocument()
    })
})
