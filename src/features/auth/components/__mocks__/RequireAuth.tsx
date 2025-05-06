import type { PropsWithChildren } from 'react'

export const RequireAuth = ({ children }: PropsWithChildren) => (
    <div data-testid="mocked-require-auth">{children}</div>
)
