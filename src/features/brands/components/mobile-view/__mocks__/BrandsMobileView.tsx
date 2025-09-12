import type { BrandsMobileViewProps } from '../BrandsMobileView'

export const BrandsMobileView = ({ items }: BrandsMobileViewProps) => (
    <div data-testid="mocked-brands-mobile-view">
        {items?.map((item) => (
            <div key={item._id} data-testid={`mocked-mobile-brand-${item._id}`}>
                {item.name}
            </div>
        ))}
    </div>
)
