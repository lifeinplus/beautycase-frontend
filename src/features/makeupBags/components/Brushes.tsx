import { Brand } from '../../brands'
import { type Tool, ToolsList } from '../../tools'

interface BrushesProps {
    tools?: Tool[]
}

export const Brushes = ({ tools }: BrushesProps) => {
    const brands = tools?.reduce((acc: Brand[], tool) => {
        const { brandId, ...toolData } = tool

        let brand = acc.find((item) => item._id === brandId._id)

        if (!brand) {
            brand = {
                _id: brandId._id,
                name: brandId.name,
                link: brandId.link,
                toolIds: [],
            }
            acc.push(brand)
        }

        brand.toolIds?.push(toolData)

        return acc
    }, [])

    return (
        <section id="brushes" className="scroll-mt-header sm:scroll-mt-0">
            <h2 className="mb-6 pt-10 text-center font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
                Кисти
            </h2>

            {brands?.map((brand, index) => (
                <article
                    key={index}
                    className="my-4 bg-gray-100 p-4 dark:bg-gray-900 sm:rounded"
                >
                    <h3 className="stage-headline">
                        <a
                            href={brand.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-rose-400 decoration-double decoration-2 hover:decoration-wavy"
                        >
                            {brand.name}
                        </a>
                    </h3>
                    {brand.toolIds && <ToolsList tools={brand.toolIds} />}
                </article>
            ))}
        </section>
    )
}
