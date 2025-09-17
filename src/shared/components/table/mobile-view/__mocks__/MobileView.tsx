import { type MobileViewProps } from '../MobileView'

export const MobileView = <T,>({
    items,
    getTitle,
    getDescription: getSubtitle,
    getRightText: getDate,
    getLink,
}: MobileViewProps<T>) => (
    <div data-testid="mocked-mobile-view">
        {items?.map((item, i) => (
            <a key={i} href={getLink(item)}>
                {getTitle && <div>{getTitle(item)}</div>}
                {getSubtitle && <div>{getSubtitle(item)}</div>}
                {getDate && <div>{getDate(item)}</div>}
            </a>
        ))}
    </div>
)
