import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { ROUTES } from '@/shared/config/routes'
import { canAccess } from '@/shared/lib/access/canAccess'
import { Role } from '@/shared/model/role'

export interface QuestionnaireCardProps {
    title: string
    imageUrl: string
    createPath: string
    resultsPath: string
}

export const QuestionnaireCard = ({
    title,
    imageUrl,
    createPath,
    resultsPath,
}: QuestionnaireCardProps) => {
    const { t } = useTranslation('questionnaire')

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const showResults = canAccess(
        { auth: true, roles: [Role.ADMIN, Role.MUA] },
        username,
        role
    )

    const questionnairesRoot = ROUTES.questionnaires.root

    return (
        <div>
            <Link
                to={`${questionnairesRoot}/${createPath}`}
                className={classNames(
                    'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                    'dark:focus-visible:outline-rose-700',
                    'relative block overflow-hidden rounded-xl ring-1 ring-neutral-200 dark:ring-neutral-600'
                )}
            >
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-32 w-full object-cover lg:h-40"
                />
                <div
                    className={classNames(
                        'absolute inset-0 bg-linear-to-tr',
                        'from-black/30 from-40% via-black/10 via-40% to-transparent to-60%',
                        'dark:from-black/50 dark:from-40% dark:via-black/30 dark:via-40% dark:to-transparent dark:to-60%'
                    )}
                />
                <div className="absolute bottom-0 px-4 py-3 pr-28 text-white sm:px-5 sm:py-4">
                    <h2 className="font-heading text-base font-semibold text-pretty text-shadow-xs/100 sm:text-lg">
                        {title}
                    </h2>
                </div>
            </Link>
            {showResults && (
                <div className="my-2 flex justify-end">
                    <Link
                        className={classNames(
                            'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700',
                            'hover:rounded hover:outline-4 hover:outline-offset-4 hover:outline-rose-400 hover:outline-dashed dark:hover:outline-rose-600',
                            'flex gap-1 text-sm/6 font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 hover:dark:text-rose-500'
                        )}
                        to={`${questionnairesRoot}/${resultsPath}`}
                    >
                        {t('results')}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            )}
        </div>
    )
}
