import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'
import { TopPanel } from '../../../components/TopPanel'
import { Hero } from '../../../components/Hero'
import { DataWrapper } from '../../../components/DataWrapper'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { formatDate } from '../../../utils/date'
import { QuestionnaireResult } from '../components/QuestionnaireResult'
import { useGetQuestionnaireByIdQuery } from '../questionnaireApiSlice'

export const QuestionnaireResultPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data, isLoading, error } = useGetQuestionnaireByIdQuery(id!)

    const createdAt = formatDate(data?.createdAt, 'dd.MM.yyyy HH:mm')

    const handleBack = () => {
        navigate('/questionnaires')
    }

    return (
        <article>
            <TopPanel title="Результаты анкеты" onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero headline="Результаты анкеты" byline={createdAt} />
                    </div>

                    <div className="sm:hidden">
                        <Hero byline={createdAt} />
                    </div>

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage="Анкета не найдена"
                    >
                        {data && <QuestionnaireResult data={data} />}
                    </DataWrapper>
                </article>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text="Назад"
                    onClick={handleBack}
                    className="nav-btn-back"
                />
            </AdaptiveNavBar>
        </article>
    )
}
