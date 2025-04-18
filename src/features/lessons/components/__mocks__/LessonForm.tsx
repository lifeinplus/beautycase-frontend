import { mockLesson } from '../../../../tests/mocks/handlers/lessonsHandlers'
import { type LessonFormProps } from '../LessonForm'

export const LessonForm = ({ title, onSubmit }: LessonFormProps) => (
    <div data-testid="mocked-lesson-form">
        <h1>{title}</h1>
        <button
            data-testid="mocked-submit-button"
            onClick={() => onSubmit(mockLesson)}
        >
            Submit
        </button>
    </div>
)
