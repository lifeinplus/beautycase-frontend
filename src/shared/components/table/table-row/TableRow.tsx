import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

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
            className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
            onClick={() => redirectPath && navigate(redirectPath)}
        >
            {cellData.map((data, idx) => (
                <td
                    key={idx}
                    className={classNames(
                        'border-b border-neutral-200 p-4 dark:border-neutral-800',
                        cellClasses[idx]
                    )}
                >
                    {data}
                </td>
            ))}
            {actions && (
                <td
                    className={classNames(
                        'border-b border-neutral-200 p-4 dark:border-neutral-800',
                        'flex justify-center gap-2'
                    )}
                >
                    {actions}
                </td>
            )}
        </tr>
    )
}
