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
            className="tr"
            onClick={() => redirectPath && navigate(redirectPath)}
        >
            {cellData.map((data, idx) => (
                <td key={idx} className={classNames('td', cellClasses[idx])}>
                    {data}
                </td>
            ))}
            {actions && (
                <td className={classNames('td', 'td-actions')}>{actions}</td>
            )}
        </tr>
    )
}
