import { fullName } from './fullName'

export const fullNameWithUsername = (
    firstName?: string,
    lastName?: string,
    username?: string
) => `${fullName(firstName, lastName)} | @${username || '—'}`
