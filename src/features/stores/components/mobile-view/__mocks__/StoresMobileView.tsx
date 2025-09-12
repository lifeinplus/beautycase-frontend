import { type StoresMobileViewProps } from '../../mobile-view/StoresMobileView'

export const StoresMobileView = ({ items }: StoresMobileViewProps) => (
    <div data-testid="mocked-stores-mobile-view">
        {items?.map((item) => (
            <div key={item._id} data-testid={`mocked-mobile-store-${item._id}`}>
                {item.name}
            </div>
        ))}
    </div>
)
