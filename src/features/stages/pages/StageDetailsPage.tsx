import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DetailsPage } from '../../../components/pages/DetailsPage'
import { Image } from '../../../components/ui/Image'
import type { Product } from '../../products/types'
import {
    useDeleteStageMutation,
    useDuplicateStageMutation,
    useReadStageByIdQuery,
} from '../stagesApiSlice'

export const StageDetailsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useReadStageByIdQuery(id!)
    const [deleteStage] = useDeleteStageMutation()
    const [duplicateStage] = useDuplicateStageMutation()

    const handleProduct = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle="Этап"
            redirectPath="/stages"
            title={data?.title}
            subtitle={data?.subtitle}
            description={data?.steps?.reduce((p, c) => p + c, '')}
            deleteItem={deleteStage}
            duplicateItem={duplicateStage}
            showDuplicate={true}
            mediaContent={
                <section className="content-image">
                    <div className="img-container img-container-rectangle">
                        <Image alt={data?.title} src={data?.imageUrl} />
                    </div>
                </section>
            }
            descriptionContent={
                <>
                    {data?.comment && (
                        <section className="content-description">
                            <p>{data?.comment}</p>
                        </section>
                    )}
                    {data?.steps?.length ? (
                        <section className="content-description">
                            <p className="my-2 font-bold sm:text-left">Шаги</p>
                            <ul className="ms-5 list-outside list-decimal">
                                {data.steps.map(
                                    (step: string, index: number) => (
                                        <li key={index}>{step}</li>
                                    )
                                )}
                            </ul>
                        </section>
                    ) : undefined}
                </>
            }
            additionalContent={
                <div className="gallery-container">
                    {data?.products?.map((product: Product) => (
                        <div
                            key={product._id}
                            className="img-container img-container-square"
                            onClick={() => handleProduct(product._id)}
                        >
                            <Image alt={product.name} src={product.imageUrl} />
                        </div>
                    ))}
                </div>
            }
        />
    )
}
