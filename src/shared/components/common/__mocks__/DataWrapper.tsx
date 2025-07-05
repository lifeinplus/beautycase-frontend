import { type DataWrapperProps } from '../DataWrapper'

export const DataWrapper = <T,>({
    children,
    isLoading,
    error,
}: DataWrapperProps<T>) => (
    <div data-testid="mocked-data-wrapper">
        {isLoading && <div data-testid="mocked-loading" />}
        {error ? <div data-testid="mocked-error" /> : <></>}
        {!isLoading && children}
    </div>
)
