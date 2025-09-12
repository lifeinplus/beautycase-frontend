import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockStoreLink1 } from '@/features/stores/api/__mocks__/storesApi'
import { ItemLink } from './ItemLink'

describe('ItemLink', () => {
    it('renders ItemLink correctly', () => {
        render(<ItemLink item={mockStoreLink1} />)
        expect(screen.getByText('Store 1')).toBeInTheDocument()
    })
})
