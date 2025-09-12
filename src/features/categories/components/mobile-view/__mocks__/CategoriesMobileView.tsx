import { type CategoriesMobileViewProps } from '../CategoriesMobileView'

export const CategoriesMobileView = ({ items }: CategoriesMobileViewProps) => (
    <div data-testid="mocked-categories-mobile-view">
        {items?.map((item) => (
            <div
                key={item._id}
                data-testid={`mocked-mobile-category-${item._id}`}
            >
                {item.name}
            </div>
        ))}
    </div>
)
