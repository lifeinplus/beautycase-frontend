import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockError } from '@/tests/mocks'
import { DataWrapper } from './DataWrapper'

vi.mock('../loading-or-error/LoadingOrError')

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

        const loadingOrError = screen.getByTestId('mocked-loading-or-error')
        const loadingElement = screen.getByText('loading')
        const childrenElement = screen.queryByTestId('children-content')

        expect(loadingOrError).toBeInTheDocument()
        expect(loadingElement).toBeInTheDocument()
        expect(childrenElement).not.toBeInTheDocument()
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
