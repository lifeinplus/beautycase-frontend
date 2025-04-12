import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockError } from '../../../../tests/mocks'
import { mockNavigate } from '../../../../tests/mocks/router'
import { renderWithRouter } from '../../../../tests/mocks/wrappers'
import {
    type AuthResultRegister,
    useRegisterUserMutation,
} from '../../authApiSlice'
import { RegisterPage } from '../RegisterPage'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../authApiSlice', () => ({
    useRegisterUserMutation: vi.fn(),
}))

const MockHome = () => <div data-testid="home-page">Home Page</div>

const MockLogin = () => <div data-testid="login-page">Login Page</div>

const MockRoutes = () => (
    <Routes>
        <Route path="/" element={<MockHome />} />
        <Route path="/login" element={<MockLogin />} />
        <Route path="/register" element={<RegisterPage />} />
    </Routes>
)

describe('RegisterPage', () => {
    const initialEntries = ['/register']

    const mockParams = {
        username: 'testuser',
        password: 'password123',
        confirmPassword: 'password123',
    }

    const mockRegisterResult: AuthResultRegister = {
        message: 'Account created successfully',
    }

    const mockRegisterUser = vi.fn(() => ({
        unwrap: () => Promise.resolve(mockRegisterResult),
    }))

    beforeEach(() => {
        vi.mocked(useRegisterUserMutation as Mock).mockReturnValue([
            mockRegisterUser,
            { isLoading: false },
        ])
    })

    it('renders the registration form correctly', () => {
        renderWithRouter(<MockRoutes />, initialEntries)

        const title = screen.getByText('Beautycase')
        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const confirmPassword =
            screen.getByPlaceholderText('Подтвердить пароль')
        const submit = screen.getByRole('button', {
            name: /Зарегистрироваться/i,
        })
        const link = screen.getByRole('link', { name: /Войти/i })

        expect(title).toBeInTheDocument()
        expect(username).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(confirmPassword).toBeInTheDocument()
        expect(submit).toBeInTheDocument()
        expect(link).toBeInTheDocument()
    })

    it('allows user to type in the fields', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const confirmPassword =
            screen.getByPlaceholderText('Подтвердить пароль')

        await user.type(username, mockParams.username)
        await user.type(password, mockParams.password)
        await user.type(confirmPassword, mockParams.confirmPassword)

        expect(username).toHaveValue(mockParams.username)
        expect(password).toHaveValue(mockParams.password)
        expect(confirmPassword).toHaveValue(mockParams.confirmPassword)
    })

    it('submits form and handles successful registration', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const confirmPassword =
            screen.getByPlaceholderText('Подтвердить пароль')
        const submit = screen.getByRole('button', {
            name: 'Зарегистрироваться',
        })

        await user.type(username, mockParams.username)
        await user.type(password, mockParams.password)
        await user.type(confirmPassword, mockParams.confirmPassword)

        await user.click(submit)

        expect(mockRegisterUser).toHaveBeenCalledWith(mockParams)
        expect(toast.success).toHaveBeenCalledWith(expect.any(String))
        expect(mockNavigate).toHaveBeenCalledWith('/login')
    })

    it('handles registration error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const mockRegisterUser = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        vi.mocked(useRegisterUserMutation as Mock).mockReturnValue([
            mockRegisterUser,
            { isLoading: false },
        ])

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const confirmPassword =
            screen.getByPlaceholderText('Подтвердить пароль')
        const submit = screen.getByRole('button', {
            name: 'Зарегистрироваться',
        })

        await user.type(username, mockParams.username)
        await user.type(password, mockParams.password)
        await user.type(confirmPassword, mockParams.confirmPassword)

        await user.click(submit)

        expect(mockRegisterUser).toHaveBeenCalledTimes(1)
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('disables submit button while loading', async () => {
        vi.mocked(useRegisterUserMutation as Mock).mockReturnValue([
            mockRegisterUser,
            { isLoading: true },
        ])

        renderWithRouter(<MockRoutes />, initialEntries)

        const submit = screen.getByRole('button', { name: /Регистрация/i })
        expect(submit).toBeDisabled()
        expect(submit).toHaveTextContent('Регистрация...')
    })

    it('navigates to login page when login link is clicked', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const link = screen.getByRole('link', { name: /войти/i })
        await user.click(link)

        expect(screen.getByTestId('login-page')).toBeInTheDocument()
    })
})
