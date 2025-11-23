import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Tile, TileProps } from '@/widgets/tile-section/ui/Tile'

export interface TileSectionProps {
    items: TileProps[]
}

export const TileSection = ({ items }: TileSectionProps) => {
    const { t } = useTranslation('navigation')

    const tileCount = items.length

    return (
        <section
            className={classNames(
                'mx-auto grid gap-x-4 gap-y-3',
                tileCount === 1
                    ? 'max-w-36 grid-cols-1'
                    : tileCount === 2 || tileCount === 4
                      ? 'max-w-xs grid-cols-2 md:px-2'
                      : 'max-w-4xl grid-cols-2 md:grid-cols-3'
            )}
        >
            {items.map((item, i) => (
                <Tile
                    key={i}
                    label={t(item.label)}
                    to={item.to}
                    icon={item.icon}
                />
            ))}
        </section>
    )
}
