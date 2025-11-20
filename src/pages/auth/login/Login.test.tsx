import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockDispatch } from '@/app/hooks/__mocks__/hooks'
import {
    mockLoginParams,
    mockLoginResult,
} from '@/features/auth/api/__mocks__/authApi'
import { useLoginUserMutation } from '@/features/auth/api/authApi'
import { ROUTES } from '@/shared/config/routes'
import { mockError } from '@/tests/mocks'
import { mockNavigate } from '@/tests/mocks/router'
import { renderWithRouter } from '@/tests/mocks/wrappers'
import { spyConsoleError } from '@/tests/setup'
import { Login } from './Login'

vi.mock('@/app/hooks/hooks')
vi.mock('@/features/auth/api/authApi')

const MockHome = () => <div data-testid="mocked-home-page">Home Page</div>

const MockRegister = () => (
    <div data-testid="mocked-register-page">Register Page</div>
)

const MockRoutes = () => (
    <Routes>
        <Route path="/" element={<MockHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<MockRegister />} />
    </Routes>
)

describe('Login', () => {
    const initialEntries = ['/login']

    const mockLogin = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useLoginUserMutation as Mock).mockReturnValue([
            mockLogin,
            { isLoading: false },
        ])

        mockLogin.mockReturnValue({ unwrap: mockUnwrap })
        mockUnwrap.mockResolvedValue(mockLoginResult)
    })

    it('renders the login form correctly', () => {
        renderWithRouter(<MockRoutes />, initialEntries)

        expect(screen.getByText('Beautycase')).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('fields.username.label')
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('fields.password.label')
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: 'login' })
        ).toBeInTheDocument()

        expect(screen.getByText('register')).toBeInTheDocument()
    })

    it('allows user to type in the fields', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('fields.username.label')
        const password = screen.getByPlaceholderText('fields.password.label')

        await user.type(username, mockLoginParams.username)
        await user.type(password, mockLoginParams.password)

        expect(username).toHaveValue(mockLoginParams.username)
        expect(password).toHaveValue(mockLoginParams.password)
    })

    it('submits form and handles successful login', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        await user.type(
            screen.getByPlaceholderText('fields.username.label'),
            mockLoginParams.username
        )

        await user.type(
            screen.getByPlaceholderText('fields.password.label'),
            mockLoginParams.password
        )

        await user.click(screen.getByRole('button', { name: 'login' }))

        expect(mockLogin).toHaveBeenCalledWith({
            username: mockLoginParams.username,
            password: mockLoginParams.password,
        })

        expect(mockDispatch).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.home, {
            replace: true,
        })
    })

    it('shows validation errors when fields are empty', async () => {
        const user = userEvent.setup()
        renderWithRouter(<MockRoutes />, initialEntries)

        await user.click(screen.getByRole('button', { name: 'login' }))

        expect(
            await screen.findByText('fields.username.errors.required')
        ).toBeInTheDocument()

        expect(
            await screen.findByText('fields.password.errors.required')
        ).toBeInTheDocument()
    })

    it('handles login error', async () => {
        const user = userEvent.setup()

        mockUnwrap.mockRejectedValue(mockError)

        renderWithRouter(<MockRoutes />, initialEntries)

        await user.type(
            screen.getByPlaceholderText('fields.username.label'),
            mockLoginParams.username
        )

        await user.type(
            screen.getByPlaceholderText('fields.password.label'),
            'wrongpassword'
        )

        await user.click(screen.getByRole('button', { name: 'login' }))

        expect(mockLogin).toHaveBeenCalled()
        expect(spyConsoleError).toHaveBeenCalledWith(mockError)
    })

    it('disables submit button while loading', () => {
        vi.mocked(useLoginUserMutation as Mock).mockReturnValue([
            mockLogin,
            { isLoading: true },
        ])

        const { debug } = renderWithRouter(<MockRoutes />, initialEntries)
        debug()

        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('navigates to register page when register link is clicked', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const link = screen.getByRole('link', { name: 'register' })
        await user.click(link)

        expect(screen.getByTestId('mocked-register-page')).toBeInTheDocument()
    })
})
