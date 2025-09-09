import { type CategoriesTableProps } from '../CategoriesTable'

export const CategoriesTable = ({
    items,
    onDelete,
    onEdit,
}: CategoriesTableProps) => (
    <div data-testid="mocked-categories-table">
        {items?.map((item) => (
            <div
                key={item._id}
                data-testid={`mocked-table-category-${item._id}`}
            >
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
