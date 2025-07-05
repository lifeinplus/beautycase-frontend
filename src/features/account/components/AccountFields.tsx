import { FilmIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import type { User, UserResult } from '@/features/users/types'

interface Field {
    label: string
    sysname: keyof User
    content?: ReactNode
    emptyMessage?: string
}

export interface AccountFieldsProps {
    data: UserResult
}

export const AccountFields = ({ data }: AccountFieldsProps) => {
    const { pathname } = useLocation()
    const { t } = useTranslation(['account', 'makeupBag'])

    const { user, makeupBags, lessons } = data

    const fields: Field[] = [
        {
            sysname: 'username',
            label: t('fields.username.label'),
            content: user && user.username,
        },
        {
            sysname: 'role',
            label: t('fields.role.label'),
            content: user?.role && t(`fields.role.types.${user?.role}`),
        },
        {
            sysname: 'makeupBags',
            label: t('fields.makeupBags.label'),
            emptyMessage: t('fields.makeupBags.emptyMessage'),
            content: makeupBags?.length && (
                <ul
                    role="list"
                    className="mt-1 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-700 sm:mt-0"
                >
                    {makeupBags.map((bag) => (
                        <li
                            key={bag._id}
                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6"
                        >
                            <div className="flex w-0 flex-1 items-center">
                                <ShoppingBagIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-neutral-400"
                                />
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">
                                        {t(
                                            `makeupBag:categories.${bag.category?.name}.full`
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 shrink-0">
                                <Link
                                    className="text-danger focus-outline hover-outline font-medium"
                                    to={`/makeup_bags/${bag._id}`}
                                    state={{ fromPathname: pathname }}
                                >
                                    {t('fields.makeupBags.link')}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            sysname: 'lessons',
            label: t('fields.lessons.label'),
            emptyMessage: t('fields.lessons.emptyMessage'),
            content: lessons?.length && (
                <ul
                    role="list"
                    className="mt-1 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-700 sm:mt-0"
                >
                    {lessons.map((lesson) => (
                        <li
                            key={lesson._id}
                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6"
                        >
                            <div className="flex w-0 flex-1 items-center">
                                <FilmIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-neutral-400"
                                />
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                    <span className="truncate font-medium">
                                        {lesson.title}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 shrink-0">
                                <Link
                                    className="text-danger focus-outline font-medium text-amber-500 dark:hover:text-amber-400"
                                    to={`/lessons/${lesson._id}`}
                                    state={{ fromPathname: pathname }}
                                >
                                    {t('fields.lessons.link')}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
    ]

    return (
        <div className="dl-container">
            <dl className="dl">
                {fields.map((f) => (
                    <div key={f.sysname} className="dl-grid">
                        <dt className="dt">{f.label}</dt>
                        <dd className="dd">{f.content || f.emptyMessage}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
