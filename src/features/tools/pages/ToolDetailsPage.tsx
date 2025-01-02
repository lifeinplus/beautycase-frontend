import { DetailsPage } from '../../../components'
import { useDeleteToolMutation, useGetToolByIdQuery } from '../toolsApiSlice'

export const ToolDetailsPage = () => (
    <DetailsPage
        title="Инструмент"
        fetchQuery={useGetToolByIdQuery}
        deleteMutation={useDeleteToolMutation}
        contentRenderer={({ name, image, number, comment }) => (
            <>
                <section className="page-content__title">
                    <h1 className="page-content__title__headline">{name}</h1>
                </section>

                <section className="page-content__image">
                    <div className="img-container">
                        <img src={image} alt={name} className="img" />
                    </div>
                </section>

                <section className="page-content__description">
                    <p>{number}</p>
                    <p>{comment}</p>
                </section>
            </>
        )}
        redirectPath="/tools"
    />
)
