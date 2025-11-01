import { FilmIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import type { User, UserResult } from '@/features/users/types'
import { ROUTES } from '@/shared/config/routes'
import { formatDate } from '@/shared/utils/date/formatDate'

interface Field {
    label: string
    sysname: keyof User
    content?: ReactNode
    emptyMessage?: string
}

export interface UserFieldsProps {
    data: UserResult
}

export const UserFields = ({ data }: UserFieldsProps) => {
    const { pathname } = useLocation()
    const { t } = useTranslation(['user', 'account', 'makeupBag'])

    const { user, makeupBags, lessons } = data

    const fields: Field[] = [
        {
            sysname: 'createdAt',
            label: t('table.createdAt'),
            content: formatDate(user.createdAt, 'yyyy.MM.dd HH:mm'),
        },
        {
            sysname: 'updatedAt',
            label: t('table.updatedAt'),
            content: formatDate(user.updatedAt, 'yyyy.MM.dd HH:mm'),
        },
        {
            sysname: 'username',
            label: t('account:fields.username.label'),
            content: user.username ? user.username : '—',
        },
        {
            sysname: 'makeupBags',
            label: t('account:fields.makeupBags.label'),
            emptyMessage: t('account:fields.makeupBags.emptyMessage'),
            content: makeupBags?.length && (
                <ul
                    role="list"
                    className="mt-1 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 md:mt-0 dark:divide-neutral-800 dark:border-neutral-700"
                >
                    {makeupBags.map((bag) => (
                        <li
                            key={bag._id}
                            className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
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
                                    className={classNames(
                                        'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                                        'dark:focus-visible:outline-rose-700',
                                        'hover:rounded hover:outline-4 hover:outline-offset-4 hover:outline-rose-400 hover:outline-dashed',
                                        'dark:hover:outline-rose-600',
                                        'text-rose-500 dark:text-rose-400',
                                        'font-medium'
                                    )}
                                    to={ROUTES.makeupBags.details(bag._id)}
                                    state={{
                                        origin: pathname,
                                        prev: pathname,
                                    }}
                                >
                                    {t('account:fields.makeupBags.link')}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            sysname: 'lessons',
            label: t('account:fields.lessons.label'),
            emptyMessage: t('account:fields.lessons.emptyMessage'),
            content: lessons?.length && (
                <ul
                    role="list"
                    className="mt-1 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 md:mt-0 dark:divide-neutral-800 dark:border-neutral-700"
                >
                    {lessons.map((lesson) => (
                        <li
                            key={lesson._id}
                            className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
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
                                    className={classNames(
                                        'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                                        'dark:focus-visible:outline-rose-700',
                                        'hover:rounded hover:outline-4 hover:outline-offset-4 hover:outline-rose-400 hover:outline-dashed',
                                        'dark:hover:outline-rose-600',
                                        'text-rose-500 dark:text-rose-400',
                                        'font-medium'
                                    )}
                                    to={ROUTES.lessons.details(lesson._id)}
                                    state={{
                                        origin: pathname,
                                        prev: pathname,
                                    }}
                                >
                                    {t('account:fields.lessons.link')}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ),
        },
    ]

    return (
        <div className="md:rounded-2.5xl pb-4 md:border md:border-neutral-200 md:pb-0 dark:md:border-neutral-700">
            <dl className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {fields.map((f) => (
                    <div
                        key={f.sysname}
                        className="px-3 py-3 md:grid md:grid-cols-3 md:gap-2 md:px-4"
                    >
                        <dt className="text-xs font-medium text-neutral-600 md:text-xs/6 dark:text-neutral-400">
                            {f.label}
                        </dt>
                        <dd className="pt-1 md:col-span-2 md:pt-0">
                            {f.content || f.emptyMessage}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
