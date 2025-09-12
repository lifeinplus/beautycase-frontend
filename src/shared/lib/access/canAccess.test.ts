import { describe, expect, it } from 'vitest'

import { canAccess } from './canAccess'

describe('canAccess', () => {
    it('allows access to public items', () => {
        expect(canAccess({})).toBe(true)
        expect(canAccess({ auth: false })).toBe(true)
    })

    it('denies access to authenticated items if no username', () => {
        expect(canAccess({ auth: true }, undefined, undefined)).toBe(false)
    })

    it('allows access if authentication is required but no roles are specified', () => {
        expect(canAccess({ auth: true }, 'user123')).toBe(true)
    })

    it('denies access if roles are specified but user has no role', () => {
        expect(canAccess({ auth: true, roles: ['admin'] }, 'user123')).toBe(
            false
        )
    })

    it('denies access if user has a different role', () => {
        expect(
            canAccess({ auth: true, roles: ['admin'] }, 'user123', 'user')
        ).toBe(false)
    })

    it('grants access if user has a matching role', () => {
        expect(
            canAccess(
                { auth: true, roles: ['admin', 'mua'] },
                'user123',
                'admin'
            )
        ).toBe(true)
        expect(
            canAccess({ auth: true, roles: ['admin', 'mua'] }, 'user123', 'mua')
        ).toBe(true)
    })

    it('denies access if roles array is empty', () => {
        expect(canAccess({ auth: true, roles: [] }, 'user123', 'admin')).toBe(
            false
        )
    })
})
