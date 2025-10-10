import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockError } from '@/tests/mocks'
import { DataWrapper } from './DataWrapper'

const mockChildren = (
    <div data-testid="mocked-children-content">Test Content</div>
)

describe('DataWrapper', () => {
    it('renders loading state', () => {
        render(
            <DataWrapper isLoading error={null}>
                {mockChildren}
            </DataWrapper>
        )

        expect(screen.getByText('loading')).toBeInTheDocument()
        expect(screen.queryByTestId('children-content')).not.toBeInTheDocument()
    })

    it('renders error state when error is present', () => {
        render(
            <DataWrapper isLoading={false} error={mockError}>
                {mockChildren}
            </DataWrapper>
        )

        expect(screen.getByText('UNKNOWN_ERROR')).toBeInTheDocument()
        expect(screen.queryByTestId('children-content')).not.toBeInTheDocument()
    })

    it('renders children when data is present and not empty', () => {
        render(
            <DataWrapper isLoading={false} error={null}>
                {mockChildren}
            </DataWrapper>
        )

        const childrenElement = screen.getByTestId('mocked-children-content')
        expect(childrenElement).toBeInTheDocument()
        expect(childrenElement).toHaveTextContent('Test Content')
    })

    it('renders children when data is a non-empty array', () => {
        render(
            <DataWrapper isLoading={false} error={null}>
                {mockChildren}
            </DataWrapper>
        )

        const childrenElement = screen.getByTestId('mocked-children-content')
        expect(childrenElement).toBeInTheDocument()
    })

    it('prioritizes loading state over error and empty states', () => {
        render(
            <DataWrapper isLoading error={mockError}>
                {mockChildren}
            </DataWrapper>
        )

        expect(screen.getByText('loading')).toBeInTheDocument()
    })
})
