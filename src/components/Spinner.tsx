export const Spinner = () => {
    return (
        <div
            className="flex min-h-screen items-center justify-center"
            role="presentation"
        >
            <div
                className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-rose-500"
                data-testid="spinner"
            ></div>
        </div>
    )
}
