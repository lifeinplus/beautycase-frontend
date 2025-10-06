import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import type { CheckboxSectionProps } from '../CheckboxSection'

export const CheckboxSection = ({
    label,
}: CheckboxSectionProps<MakeupBagQuestionnaire>) => (
    <textarea data-testid="mocked-checkbox-section" placeholder={label} />
)
