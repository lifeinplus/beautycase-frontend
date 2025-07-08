import { type LoadingOrErrorProps } from '../LoadingOrError'

export const LoadingOrError = ({ message }: LoadingOrErrorProps) => (
    <div data-testid="mocked-loading-or-error">{message}</div>
)
