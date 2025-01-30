import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface TableRowProps {
    cellClasses?: string[]
    cellData: (string | number | undefined)[]
    redirectPath: string
}

export const TableRow = ({
    cellClasses = [],
    cellData,
    redirectPath,
}: TableRowProps) => {
    const navigate = useNavigate()

    return (
        <tr className="tr" onClick={() => navigate(redirectPath)}>
            {cellData.map((data, idx) => (
                <td key={idx} className={classNames('td', cellClasses[idx])}>
                    {data}
                </td>
            ))}
        </tr>
    )
}
