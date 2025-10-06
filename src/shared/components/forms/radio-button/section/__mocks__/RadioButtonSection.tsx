import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import type { RadioButtonSectionProps } from '../RadioButtonSection'

export const RadioButtonSection = ({
    label,
}: RadioButtonSectionProps<MakeupBagQuestionnaire>) => (
    <textarea data-testid="mocked-radio-button-section" placeholder={label} />
)
