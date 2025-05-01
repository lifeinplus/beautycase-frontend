import { type Good, type GoodsGridProps } from '../GoodsGrid'

export const GoodsGrid = <T extends Good>({
    goods,
    basePath,
}: GoodsGridProps<T>) => (
    <div data-testid="mocked-goods-grid">
        <span>Base Path: {basePath}</span>
        <span>Products Count: {goods.length}</span>
    </div>
)
