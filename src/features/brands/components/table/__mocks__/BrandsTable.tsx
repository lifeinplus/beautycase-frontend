import type { BrandsTableProps } from '../BrandsTable'

export const BrandsTable = ({ items, onDelete, onEdit }: BrandsTableProps) => (
    <div data-testid="mocked-brands-table">
        {items?.map((item) => (
            <div key={item._id} data-testid={`mocked-table-brand-${item._id}`}>
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
