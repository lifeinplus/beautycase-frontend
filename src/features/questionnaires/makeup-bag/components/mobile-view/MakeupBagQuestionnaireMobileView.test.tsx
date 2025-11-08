import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockMakeupBagQuestionnaires } from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import { renderWithProviderAndRouter } from '@/tests/mocks/wrappers'
import { MakeupBagQuestionnaireMobileView } from './MakeupBagQuestionnaireMobileView'

vi.mock('@/shared/utils/date/formatDate')

describe('MakeupBagQuestionnaireMobileView', () => {
    it('renders the mobile view component with correct props', () => {
        renderWithProviderAndRouter(
            <MakeupBagQuestionnaireMobileView
                questionnaires={mockMakeupBagQuestionnaires}
            />
        )

        expect(screen.getAllByText('2025.04.10 14:30')).toHaveLength(2)
        expect(screen.getByText('Client 1')).toBeInTheDocument()
        expect(screen.getByText('City 1')).toBeInTheDocument()
    })
})
