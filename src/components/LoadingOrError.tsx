interface LoadingOrErrorProps {
    message: string
}

export const LoadingOrError = ({ message }: LoadingOrErrorProps) => (
    <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">{message}</p>
    </div>
)
