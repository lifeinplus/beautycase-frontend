import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OnlineServices } from './OnlineServices'

describe('OnlineServices', () => {
    it('renders all service cards', () => {
        render(<OnlineServices />)

        const values = [
            'services.miniConsultation.name',
            'services.makeupBag.name',
            'services.videoLesson.name',
            'services.premiumPackage.name',
        ]

        values.forEach((v) => {
            expect(screen.getByText(v)).toBeInTheDocument()
        })
    })

    it('displays correct prices for each service', () => {
        render(<OnlineServices />)

        expect(screen.getByText('€25')).toBeInTheDocument()
        expect(screen.getByText('€45')).toBeInTheDocument()
        expect(screen.getByText('€70')).toBeInTheDocument()
        expect(screen.getByText('€250')).toBeInTheDocument()
    })

    it('marks makeup bag service as popular', () => {
        render(<OnlineServices />)

        const makeupBagContainer = screen
            .getByText('services.makeupBag.name')
            .closest('div')
        expect(makeupBagContainer).toHaveClass(/_containerPopular_/)
    })
})
