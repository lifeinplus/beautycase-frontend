import { type TableProps } from '../Table'

export const Table = <T,>({ headers, renderRow, data }: TableProps<T>) => {
    return (
        <div>
            {headers?.map((h, i) => <div key={i}>{h.label}</div>)}
            {data?.map(renderRow)}
        </div>
    )
}
