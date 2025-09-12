import { type TableProps } from '../Table'

export const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => {
    return (
        <table>
            <thead>
                <tr>{headers?.map((h, i) => <th key={i}>{h.label}</th>)}</tr>
            </thead>
            <tbody>{data?.map(renderRow)}</tbody>
        </table>
    )
}
