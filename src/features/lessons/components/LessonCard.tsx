import { Link } from 'react-router-dom'

import { Lesson } from '../types'

interface LessonCardProps {
    lesson: Lesson
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
    return (
        <Link to={`/lessons/${lesson._id}`} className="lesson-card">
            <div className="lesson-card-thumbnail-container">
                <img
                    src={lesson.thumbnailUrl}
                    alt={`${lesson.title} Thumbnail`}
                    className="lesson-card-thumbnail-image"
                />
            </div>

            <div className="lesson-card-metadata">
                <h3 className="lesson-card-headline">{lesson.title}</h3>
                <p className="lesson-card-byline">{lesson.shortDescription}</p>
            </div>
        </Link>
    )
}
