import { type StoresTableProps } from '../../table/StoresTable'

export const StoresTable = ({ items, onDelete, onEdit }: StoresTableProps) => (
    <div data-testid="mocked-stores-table">
        {items?.map((item) => (
            <div key={item._id} data-testid={`mocked-table-store-${item._id}`}>
                <span>{item.name}</span>
                <button
                    data-testid={`mocked-table-edit-${item._id}`}
                    onClick={() => onEdit(item)}
                >
                    Edit
                </button>
                <button
                    data-testid={`mocked-table-delete-${item._id}`}
                    onClick={() => onDelete(item)}
                >
                    Delete
                </button>
            </div>
        ))}
    </div>
)
