import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { getErrorMessage } from '../../utils/errorUtils'
import { DataWrapper } from '../DataWrapper'
import { mockError } from '../../tests/mocks'

vi.mock('../LoadingOrError')

vi.mock('../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

const mockData = { id: 1, name: 'Test' }
const mockDataArrray = [mockData]

const mockEmptyMessage = 'No data available'

const mockChildren = (
    <div data-testid="mocked-children-content">Test Content</div>
)

describe('DataWrapper', () => {
    it('renders loading state', () => {
        render(
            <DataWrapper
                isLoading
                error={null}
                data={undefined}
                emptyMessage={mockEmptyMessage}
            >
                {mockChildren}
            </DataWrapper>
        )

        const loadingOrError = screen.getByTestId('mocked-loading-or-error')
        const loadingElement = screen.getByText('Загрузка...')
        const childrenElement = screen.queryByTestId('children-content')

        expect(loadingOrError).toBeInTheDocument()
        expect(loadingElement).toBeInTheDocument()
        expect(childrenElement).not.toBeInTheDocument()
    })

    it('renders error state when error is present', () => {
        render(
            <DataWrapper
                isLoading={false}
                error={mockError}
                data={undefined}
                emptyMessage={mockEmptyMessage}
            >
                {mockChildren}
            </DataWrapper>
        )

        expect(getErrorMessage).toHaveBeenCalledWith(mockError)

        const errorElement = screen.getByText(mockError.message)
        expect(errorElement).toBeInTheDocument()

        const childrenElement = screen.queryByTestId('children-content')
        expect(childrenElement).not.toBeInTheDocument()
    })

    it('renders empty message when data is undefined', () => {
        render(
            <DataWrapper
                isLoading={false}
                error={null}
                data={undefined}
                emptyMessage={mockEmptyMessage}
            >
                {mockChildren}
            </DataWrapper>
        )

        const emptyElement = screen.getByText(mockEmptyMessage)
        expect(emptyElement).toBeInTheDocument()

        const childrenElement = screen.queryByTestId('children-content')
        expect(childrenElement).not.toBeInTheDocument()
    })

    it('renders empty message when data is an empty array', () => {
        render(
            <DataWrapper
                isLoading={false}
                error={null}
                data={[]}
                emptyMessage={mockEmptyMessage}
            />
        )

        const emptyElement = screen.getByText(mockEmptyMessage)
        expect(emptyElement).toBeInTheDocument()

        expect(screen.queryByTestId('children-content')).not.toBeInTheDocument()
    })

    it('renders children when data is present and not empty', () => {
        render(
            <DataWrapper
                isLoading={false}
                error={null}
                data={mockData}
                emptyMessage={mockEmptyMessage}
            >
                {mockChildren}
            </DataWrapper>
        )

        const childrenElement = screen.getByTestId('mocked-children-content')
        expect(childrenElement).toBeInTheDocument()
        expect(childrenElement).toHaveTextContent('Test Content')
    })

    it('renders children when data is a non-empty array', () => {
        render(
            <DataWrapper
                isLoading={false}
                error={null}
                data={mockDataArrray}
                emptyMessage={mockEmptyMessage}
            >
                {mockChildren}
            </DataWrapper>
        )

        const childrenElement = screen.getByTestId('mocked-children-content')
        expect(childrenElement).toBeInTheDocument()
    })

    it('prioritizes loading state over error and empty states', () => {
        render(
            <DataWrapper
                isLoading
                error={mockError}
                data={undefined}
                emptyMessage={mockEmptyMessage}
            >
                {mockChildren}
            </DataWrapper>
        )

        const loadingElement = screen.getByText('Загрузка...')
        expect(loadingElement).toBeInTheDocument()

        expect(getErrorMessage).not.toHaveBeenCalled()
    })

    it('prioritizes error state over empty state', () => {
        render(
            <DataWrapper
                isLoading={false}
                error={mockError}
                data={undefined}
                emptyMessage={mockEmptyMessage}
            >
                {mockChildren}
            </DataWrapper>
        )

        const errorElement = screen.getByText(mockError.message)
        expect(errorElement).toBeInTheDocument()
        expect(getErrorMessage).toHaveBeenCalledWith(mockError)
    })
})
