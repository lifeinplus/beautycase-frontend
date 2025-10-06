import type { MakeupBagQuestionnaireDataProps } from '../MakeupBagQuestionnaireData'

export const MakeupBagQuestionnaireData = ({
    data,
}: MakeupBagQuestionnaireDataProps) => (
    <div data-testid="mocked-makeup-bag-questionnaire-data">{data?.name}</div>
)
