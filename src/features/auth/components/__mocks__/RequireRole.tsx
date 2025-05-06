import type { PropsWithChildren } from 'react'

export const RequireRole = ({ children }: PropsWithChildren) => (
    <div data-testid="mocked-require-role">{children}</div>
)
