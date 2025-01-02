import { DetailsPage } from '../../../components'
import {
    useDeleteProductMutation,
    useGetProductByIdQuery,
} from '../productApiSlice'

export const ProductDetailsPage = () => (
    <DetailsPage
        title="Продукт"
        fetchQuery={useGetProductByIdQuery}
        deleteMutation={useDeleteProductMutation}
        contentRenderer={({ name, image, buy }) => (
            <>
                <section className="page-content__title">
                    <h1 className="page-content__title__headline">{name}</h1>
                </section>
                <section className="page-content__image">
                    <div className="img-container img-container-rectangle">
                        <img src={image} alt={name} className="img" />
                    </div>
                </section>
                <section className="page-content__description">
                    <p>Купить: {buy}</p>
                </section>
            </>
        )}
        redirectPath="/products"
    />
)
