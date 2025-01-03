import { ChevronRightIcon, EyeIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { AdaptiveNavBar, Header, Hero } from '../../../components'
import { useGetQuestionnairesQuery } from '../questionnaireApiSlice'

export const QuestionnaireList = () => {
    const {
        data: questionnaires,
        isLoading,
        error,
    } = useGetQuestionnairesQuery()

    return (
        <article>
            <Header />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container page-content__container-sm">
                        <Hero headline="Анкеты" />

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">
                                Failed to load questionnaires.
                            </p>
                        ) : (
                            <>
                                <div className="rounded-2.5xl relative hidden h-full w-full flex-col overflow-scroll border border-neutral-200 bg-white bg-clip-border text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300 sm:flex">
                                    <table className="w-full min-w-max table-auto text-left">
                                        <thead>
                                            <tr>
                                                <th className="border-b border-neutral-300 p-4 dark:border-neutral-700">
                                                    <p className="text-center text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
                                                        Дата
                                                    </p>
                                                </th>
                                                <th className="border-b border-neutral-300 p-4 dark:border-neutral-700">
                                                    <p className="text-center text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
                                                        Время
                                                    </p>
                                                </th>
                                                <th className="border-b border-neutral-300 p-4 dark:border-neutral-700">
                                                    <p className="text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
                                                        Имя
                                                    </p>
                                                </th>
                                                <th className="border-b border-neutral-300 p-4 dark:border-neutral-700">
                                                    <p className="text-right text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
                                                        Возраст
                                                    </p>
                                                </th>
                                                <th className="border-b border-neutral-300 p-4 dark:border-neutral-700">
                                                    <p className="text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
                                                        Город
                                                    </p>
                                                </th>
                                                <th className="border-b border-neutral-300 p-4 dark:border-neutral-700">
                                                    <p className="text-center text-xs font-normal leading-none text-neutral-600 dark:text-neutral-400">
                                                        Действие
                                                    </p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {questionnaires?.map(
                                                (item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="hover:bg-neutral-100 hover:dark:bg-neutral-800"
                                                    >
                                                        <td className="border-b border-neutral-200 p-4 dark:border-neutral-800">
                                                            <p className="text-center text-neutral-800 dark:text-neutral-200">
                                                                {format(
                                                                    item.createdAt ||
                                                                        '',
                                                                    'yyyy.MM.dd'
                                                                )}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-neutral-200 p-4 dark:border-neutral-800">
                                                            <p className="text-center text-neutral-800 dark:text-neutral-200">
                                                                {format(
                                                                    item.createdAt ||
                                                                        '',
                                                                    'HH:mm'
                                                                )}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-neutral-200 p-4 dark:border-neutral-800">
                                                            <p className="text-neutral-800 dark:text-neutral-200">
                                                                {item.name}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-neutral-200 p-4 dark:border-neutral-800">
                                                            <p className="text-right text-neutral-800 dark:text-neutral-200">
                                                                {item.age}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-neutral-200 p-4 dark:border-neutral-800">
                                                            <p className="text-neutral-800 dark:text-neutral-200">
                                                                {item.city}
                                                            </p>
                                                        </td>
                                                        <td className="border-b border-neutral-200 p-4 dark:border-neutral-800">
                                                            <Link
                                                                className="flex justify-center font-semibold text-neutral-800 dark:text-neutral-200"
                                                                to={`/questionnaire/${item._id}`}
                                                            >
                                                                <EyeIcon className="h-6 w-6" />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="space-y-5 sm:hidden">
                                    {questionnaires?.map((item, index) => (
                                        <Link
                                            key={index}
                                            className="flex flex-row items-center justify-between pe-5 ps-4"
                                            to={`/questionnaire/${item._id}`}
                                        >
                                            <div>
                                                <p className="text-black dark:text-white">
                                                    {`
                                                    ${item.name}, ${item.age}
                                                    `}
                                                </p>
                                                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                                    {item.city}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                                    {format(
                                                        item.createdAt || '',
                                                        'yyyy.MM.dd HH:mm'
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <ChevronRightIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
