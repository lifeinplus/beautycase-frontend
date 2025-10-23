import { Role } from '@/shared/model/role'

export interface AuthState {
    accessToken?: string
    role?: Role
    userId?: string
    username?: string
}

export interface AuthQueryLogin {
    username: string
    password: string
}

export interface AuthResultLogin
    extends Pick<AuthState, 'accessToken' | 'userId'> {}

export interface AuthQueryRegister {
    username: string
    password: string
    confirmPassword: string
}
