import { useNavigate } from 'react-router-dom'

import { CloudinaryImage } from '../../image/CloudinaryImage'
import { useScrollToElement } from './hooks/useScrollToElement'

export interface Good {
    _id?: string
    brand?: { name: string }
    imageIds: string[]
    name: string
}

export interface GoodsGridProps<T extends Good> {
    goods: T[]
    basePath: string
}

export const GoodsGrid = <T extends Good>({
    goods,
    basePath,
}: GoodsGridProps<T>) => {
    const navigate = useNavigate()
    const { pathname, state, scroll } = useScrollToElement()

    const handleClick = (id?: string) => {
        navigate(`${basePath}/${id}`, {
            state: {
                origin: state?.origin || pathname,
                prev: pathname,
            },
        })
    }

    return (
        <article className="mx-auto mt-5 grid max-w-2xl gap-y-8 md:grid-cols-2">
            {goods.map((g) => (
                <div
                    key={g._id}
                    className="relative cursor-pointer overflow-hidden px-6"
                    onClick={() => handleClick(g._id)}
                    ref={g._id === state?.scrollId ? scroll : null}
                >
                    <div className="relative mx-auto aspect-square w-2/3 overflow-hidden">
                        <CloudinaryImage
                            className="h-full w-full rounded-sm object-cover md:rounded"
                            imageId={g.imageIds[0]}
                        />
                    </div>
                    <h6 className="font-heading mt-4 text-center text-sm">
                        {g.name}
                    </h6>
                    <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
                        {g.brand?.name}
                    </p>
                </div>
            ))}
        </article>
    )
}
