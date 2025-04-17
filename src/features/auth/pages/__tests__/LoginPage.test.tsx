import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'

import { mockError } from '../../../../tests/mocks'
import { mockDispatch } from '../../../../tests/mocks/app'
import { mockLoginResult } from '../../../../tests/mocks/auth'
import { mockNavigate } from '../../../../tests/mocks/router'
import { renderWithRouter } from '../../../../tests/mocks/wrappers'
import { useLoginUserMutation } from '../../authApiSlice'
import { LoginPage } from '../LoginPage'

vi.mock('../../../../utils/errorUtils', () => ({
    getErrorMessage: vi.fn((error) => error.message),
}))

vi.mock('../../authApiSlice', () => ({
    useLoginUserMutation: vi.fn(),
}))

const MockHome = () => <div data-testid="mocked-home-page">Home Page</div>

const MockRegister = () => (
    <div data-testid="mocked-register-page">Register Page</div>
)

const MockRoutes = () => (
    <Routes>
        <Route path="/" element={<MockHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<MockRegister />} />
    </Routes>
)

describe('LoginPage', () => {
    const initialEntries = ['/login']

    const mockParams = {
        username: 'testuser',
        password: 'password123',
    }

    const mockLoginUser = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useLoginUserMutation as Mock).mockReturnValue([
            mockLoginUser,
            { isLoading: false },
        ])

        mockLoginUser.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockLoginResult)
    })

    it('renders the login form correctly', () => {
        renderWithRouter(<MockRoutes />, initialEntries)

        const title = screen.getByText('Beautycase')
        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const submit = screen.getByRole('button', { name: /войти/i })
        const link = screen.getByText(/зарегистрироваться/i)

        expect(title).toBeInTheDocument()
        expect(username).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(submit).toBeInTheDocument()
        expect(link).toBeInTheDocument()
    })

    it('focuses username input on mount', () => {
        renderWithRouter(<MockRoutes />, initialEntries)
        const username = screen.getByPlaceholderText('Имя пользователя')
        expect(document.activeElement).toBe(username)
    })

    it('allows user to type in the fields', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')

        await user.type(username, mockParams.username)
        await user.type(password, mockParams.password)

        expect(username).toHaveValue(mockParams.username)
        expect(password).toHaveValue(mockParams.password)
    })

    it('submits form and handles successful login', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const submit = screen.getByRole('button', { name: /войти/i })

        await user.type(username, mockParams.username)
        await user.type(password, mockParams.password)

        await user.click(submit)

        expect(mockLoginUser).toHaveBeenCalledWith({
            username: mockParams.username,
            password: mockParams.password,
        })
        expect(mockDispatch).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
    })

    it('handles login error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('Имя пользователя')
        const password = screen.getByPlaceholderText('Пароль')
        const submit = screen.getByRole('button', { name: /войти/i })

        await user.type(username, mockParams.username)
        await user.type(password, 'wrongpassword')

        await user.click(submit)

        expect(mockLoginUser).toHaveBeenCalled()
        expect(mockConsoleError).toHaveBeenCalledWith(mockError)
        expect(toast.error).toHaveBeenCalledWith(mockError.message)

        mockConsoleError.mockRestore()
    })

    it('disables submit button while loading', () => {
        vi.mocked(useLoginUserMutation as Mock).mockReturnValue([
            mockLoginUser,
            { isLoading: true },
        ])

        renderWithRouter(<MockRoutes />, initialEntries)

        const submit = screen.getByRole('button', { name: /вход.../i })
        expect(submit).toBeDisabled()
        expect(submit).toHaveTextContent('Вход...')
    })

    it('navigates to register page when register link is clicked', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const link = screen.getByRole('link', { name: /зарегистрироваться/i })
        await user.click(link)

        expect(screen.getByTestId('mocked-register-page')).toBeInTheDocument()
    })
})
