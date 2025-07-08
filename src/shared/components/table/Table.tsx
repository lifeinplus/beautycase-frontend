import classNames from 'classnames'

import type { Header } from '../../types/table'
import styles from './Table.module.css'

export interface TableProps<T> {
    headers: Header[]
    data?: T[]
    renderRow: (item: T) => JSX.Element
}

export const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => (
    <div className={styles.container}>
        <table className={styles.table}>
            <thead>
                <tr>
                    {headers.map(({ label, className }) => (
                        <th
                            key={label}
                            className={classNames(styles.th, className)}
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
