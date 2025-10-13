import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockTools } from '@/features/tools/api/__mocks__/toolsApi'
import { MakeupBagTools } from './MakeupBagTools'

describe('MakeupBagTools', () => {
    it('renders the component with heading', () => {
        render(<MakeupBagTools tools={mockTools} />)

        expect(
            screen.getByRole('heading', {
                name: 'titles.list',
                level: 2,
            })
        ).toBeInTheDocument()
    })

    it('renders GoodsGrid only for tools with products', () => {
        render(<MakeupBagTools tools={mockTools} />)
        expect(screen.getAllByRole('img')).toHaveLength(3)
    })
})
