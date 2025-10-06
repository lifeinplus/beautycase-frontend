import { TrainingQuestionnaireDataProps } from '../TrainingQuestionnaireData'

export const TrainingQuestionnaireData = ({
    data,
}: TrainingQuestionnaireDataProps) => (
    <div data-testid="mocked-training-questionnaire-data">{data?.name}</div>
)
