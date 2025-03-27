import { screen, fireEvent, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import {
    mockDispatch,
    mockNavigate,
    renderWithRouter,
    Wrapper,
} from '../../../../tests'
import { useLoginUserMutation } from '../../authApiSlice'
import { AuthState } from '../../authSlice'
import { LoginPage } from '../LoginPage'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => String(error)),
}))

vi.mock('../../authApiSlice', () => ({
    useLoginUserMutation: vi.fn(),
}))

const MockHome = () => <div data-testid="home-page">Home Page</div>

const MockRegister = () => <div data-testid="register-page">Register Page</div>

const MockRoutes = () => (
    <Wrapper>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MockHome />} />
            <Route path="/register" element={<MockRegister />} />
        </Routes>
    </Wrapper>
)

describe('LoginPage', () => {
    const initialEntries = ['/login']

    const mockLoginResponse: AuthState = {
        accessToken: 'test-token',
        userId: '1',
        username: 'testuser',
    }

    const mockLogin = vi.fn(() => ({
        unwrap: () => Promise.resolve(mockLoginResponse),
    }))

    beforeEach(() => {
        ;(useLoginUserMutation as Mock).mockReturnValue([
            mockLogin,
            { isLoading: false },
        ])
    })

    it('renders login form correctly', () => {
        renderWithRouter(<MockRoutes />, initialEntries)

        const title = screen.getByText('Beautycase')
        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const submit = screen.getByRole('button', { name: /войти/i })
        const registerLink = screen.getByText(/зарегистрироваться/i)

        expect(title).toBeInTheDocument()
        expect(username).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(submit).toBeInTheDocument()
        expect(registerLink).toBeInTheDocument()
    })

    it('focuses username input on mount', () => {
        renderWithRouter(<MockRoutes />, initialEntries)
        const username = screen.getByPlaceholderText('Имя пользователя')
        expect(document.activeElement).toBe(username)
    })

    it('allows entering username and password', () => {
        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')

        fireEvent.change(username, { target: { value: 'testuser' } })
        fireEvent.change(password, { target: { value: 'password123' } })

        expect(username).toHaveValue('testuser')
        expect(password).toHaveValue('password123')
    })

    it('navigates to register page when register link is clicked', () => {
        renderWithRouter(<MockRoutes />, initialEntries)

        const registerLink = screen.getByText(/зарегистрироваться/i)
        fireEvent.click(registerLink)

        expect(screen.getByTestId('register-page')).toBeInTheDocument()
    })

    it('submits form and handles successful login', async () => {
        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const submit = screen.getByRole('button', { name: /войти/i })

        fireEvent.change(username, { target: { value: 'testuser' } })
        fireEvent.change(password, { target: { value: 'password123' } })

        fireEvent.submit(submit)

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                username: 'testuser',
                password: 'password123',
            })
            expect(mockDispatch).toHaveBeenCalled()
            expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
        })
    })

    it('handles login error', async () => {
        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        const mockError = new Error('Invalid credentials')

        const mockLogin = vi.fn(() => ({
            unwrap: () => Promise.reject(mockError),
        }))

        ;(useLoginUserMutation as Mock).mockReturnValue([
            mockLogin,
            { isLoading: false },
        ])

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const submit = screen.getByRole('button', { name: /войти/i })

        fireEvent.change(username, { target: { value: 'testuser' } })
        fireEvent.change(password, { target: { value: 'wrongpassword' } })

        fireEvent.submit(submit)

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalled()
            expect(mockConsoleError).toHaveBeenCalledWith(mockError)
            expect(toast.error).toHaveBeenCalledWith(expect.any(String))
        })

        mockConsoleError.mockRestore()
    })

    it('disables submit button while loading', () => {
        ;(useLoginUserMutation as Mock).mockReturnValue([
            mockLogin,
            { isLoading: true },
        ])

        renderWithRouter(<MockRoutes />, initialEntries)

        const submit = screen.getByRole('button', { name: /вход.../i })
        expect(submit).toBeDisabled()
        expect(submit).toHaveTextContent('Вход...')
    })
})
