import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OnlineServices } from './OnlineServices'

describe('OnlineServices', () => {
    describe('narrow service cards', () => {
        it('renders all services', () => {
            render(<OnlineServices />)

            const values = [
                'services.consultation.name',
                'services.makeupBag.name',
                'services.videoLesson.name',
                'services.premiumPackage.name',
            ]

            values.forEach((v) => {
                expect(screen.getByText(v)).toBeInTheDocument()
            })
        })

        it('displays correct service prices', () => {
            render(<OnlineServices />)

            expect(screen.getAllByText('€25')).toHaveLength(3)
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

    describe('wide service cards', () => {
        it('renders all workshops', () => {
            render(<OnlineServices />)

            const values = [
                'workshops.workshopMakeup.name',
                'workshops.workshopHairStyle.name',
            ]

            values.forEach((v) => {
                expect(screen.getByText(v)).toBeInTheDocument()
            })
        })
    })
})
