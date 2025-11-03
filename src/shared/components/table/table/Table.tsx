import classNames from 'classnames'

import type { Header } from './types'

export interface TableProps<T> {
    headers: Header[]
    data?: T[]
    renderRow: (item: T) => JSX.Element
}

export const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => (
    <div
        className={classNames(
            'rounded-2.5xl relative hidden h-full w-full flex-col overflow-scroll border border-neutral-200 bg-white bg-clip-border text-neutral-700 md:flex',
            'dark:border-neutral-800 dark:bg-black dark:text-neutral-300'
        )}
    >
        <table className="w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    {headers.map(({ label, className }) => (
                        <th
                            key={label}
                            className={classNames(
                                'border-b border-neutral-300 p-4 text-xs font-normal text-neutral-600',
                                'dark:border-neutral-700 dark:text-neutral-400',
                                className
                            )}
                        >
                            {label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{data?.map(renderRow)}</tbody>
        </table>
    </div>
)
