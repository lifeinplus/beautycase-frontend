import { type QuestionnaireDetailsProps } from '../QuestionnaireResult'

export const QuestionnaireResult = ({ data }: QuestionnaireDetailsProps) => (
    <div data-testid="mocked-questionnaire-result">{data?.name}</div>
)
