import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockStoreLinks } from '@/features/stores/__mocks__/storesApi'
import { StoreLinks } from './StoreLinks'

vi.mock('./ui/AddButton')
vi.mock('./ui/ItemLink')

describe('StoreLinks', () => {
    it('renders StoreLinks correctly', () => {
        render(<StoreLinks storeLinks={mockStoreLinks} type="product" />)

        expect(screen.getByText('titles.links.product')).toBeInTheDocument()
    })
})
