interface PageTitleProps {
    headline: string
    byline?: string
}

export const PageTitle = ({ headline, byline }: PageTitleProps) => {
    return (
        <section className="page-title">
            <h1 className="page-headline">{headline}</h1>
            {byline && <h2 className="page-byline">{byline}</h2>}
        </section>
    )
}
