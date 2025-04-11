import classNames from 'classnames'

import type { Header } from '../../types/table'

interface TableProps<T> {
    headers: Header[]
    data?: T[]
    renderRow: (item: T) => JSX.Element
}

export const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => (
    <div className="table-container">
        <table className="table">
            <thead>
                <tr>
                    {headers.map(({ label, className }) => (
                        <th key={label} className={classNames('th', className)}>
                            {label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{data?.map(renderRow)}</tbody>
        </table>
    </div>
)
