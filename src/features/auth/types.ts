export interface AuthState {
    accessToken?: string
    role?: string
    userId?: string
    username?: string
}

export interface AuthQueryLogin {
    username: string
    password: string
}

export interface AuthResultLogin
    extends Pick<AuthState, 'accessToken' | 'userId'> {}

export interface AuthResultRegister {
    message: string
}

export interface AuthQueryRegister {
    username: string
    password: string
    confirmPassword: string
}
