import { type TableRowProps } from '../TableRow'

export const TableRow = ({ cellData }: TableRowProps) => {
    return cellData?.map((cell, i) => <div key={i}>{cell}</div>)
}
