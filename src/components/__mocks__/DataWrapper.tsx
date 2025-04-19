import { type DataWrapperProps } from '../DataWrapper'

export const DataWrapper = <T,>({ children }: DataWrapperProps<T>) => (
    <div data-testid="mocked-data-wrapper">{children}</div>
)
