import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Confirmation } from './Confirmation'

vi.mock('@/shared/components/common/Hero')
vi.mock('@/shared/components/layout/Header')

describe('Confirmation', () => {
    it('renders components correctly', () => {
        render(<Confirmation />)
        expect(screen.getByTestId('mocked-header')).toBeInTheDocument()
    })
})
