import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import styles from './TableRow.module.css'

export interface TableRowProps {
    cellClasses?: string[]
    cellData: (string | number | undefined)[]
    redirectPath?: string
    actions?: JSX.Element
}

export const TableRow = ({
    cellClasses = [],
    cellData,
    redirectPath,
    actions,
}: TableRowProps) => {
    const navigate = useNavigate()

    return (
        <tr
            className={styles.tr}
            onClick={() => redirectPath && navigate(redirectPath)}
        >
            {cellData.map((data, idx) => (
                <td
                    key={idx}
                    className={classNames(styles.td, cellClasses[idx])}
                >
                    {data}
                </td>
            ))}
            {actions && (
                <td className={classNames(styles.td, styles.actions)}>
                    {actions}
                </td>
            )}
        </tr>
    )
}
