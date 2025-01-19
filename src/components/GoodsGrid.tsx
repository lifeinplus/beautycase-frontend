import { useNavigate } from 'react-router-dom'

import { useScrollToElement } from '../hooks'

interface Good {
    _id?: string
    name: string
    image: string
    brandId?: {
        name: string
    }
}

interface GoodsGridProps<T extends Good> {
    goods: T[]
    basePath: string
}

export const GoodsGrid = <T extends Good>({
    goods,
    basePath,
}: GoodsGridProps<T>) => {
    const { pathname, state, scroll } = useScrollToElement()
    const navigate = useNavigate()

    const handleClick = (id?: string) => {
        navigate(`${basePath}/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    return (
        <article className="mx-auto mt-5 grid max-w-2xl gap-y-8 sm:grid-cols-2">
            {goods.map((g) => (
                <div
                    key={g._id}
                    className="relative cursor-pointer overflow-hidden px-6"
                    onClick={() => handleClick(g._id)}
                    ref={g._id === state?.scrollId ? scroll : null}
                >
                    <div className="relative mx-auto aspect-square w-2/3 overflow-hidden">
                        <img
                            alt={g.name}
                            className="h-full w-full rounded object-cover"
                            src={g.image}
                        />
                    </div>
                    <h6 className="mt-4 text-center font-heading text-sm">
                        {g.name}
                    </h6>
                    <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
                        {g.brandId?.name}
                    </p>
                </div>
            ))}
        </article>
    )
}
