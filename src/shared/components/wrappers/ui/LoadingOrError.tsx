export interface LoadingOrErrorProps {
    message: string
}

export const LoadingOrError = ({ message }: LoadingOrErrorProps) => (
    <div className="flex h-[50vh] items-center justify-center">
        <p className="text-center text-lg text-gray-500">{message}</p>
    </div>
)
