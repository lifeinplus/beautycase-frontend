import { type QuestionnaireDataProps } from '../QuestionnaireData'

export const QuestionnaireData = ({ data }: QuestionnaireDataProps) => (
    <div data-testid="mocked-questionnaire-data">{data?.name}</div>
)
