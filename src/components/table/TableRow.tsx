import classNames from 'classnames'

interface TableRowProps {
    cellClasses?: string[]
    cellData: (string | number)[]
    actions?: JSX.Element
}

export const TableRow = ({
    cellClasses = [],
    cellData,
    actions,
}: TableRowProps) => (
    <tr className="tr">
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
