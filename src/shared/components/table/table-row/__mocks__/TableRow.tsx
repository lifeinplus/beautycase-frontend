import { type TableRowProps } from '../TableRow'

export const TableRow = ({ cellData, actions }: TableRowProps) => {
    return (
        <tr>
            {cellData?.map((cell, i) => <td key={i}>{cell}</td>)}
            {actions && <td>{actions}</td>}
        </tr>
    )
}
