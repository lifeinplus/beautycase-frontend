import { mockLesson1 } from '../../../api/__mocks__/lessonsApi'
import { type LessonFormProps } from '../LessonForm'

export const LessonForm = ({ title, onSubmit }: LessonFormProps) => (
    <div data-testid="mocked-lesson-form">
        <h1>{title}</h1>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockLesson1)}
        >
            Submit
        </button>
    </div>
)
