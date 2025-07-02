import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { mockNavigate } from '../../../../tests/mocks/router'
import { renderWithRouter } from '../../../../tests/mocks/wrappers'
import { mockError } from '../../../../utils/__mocks__/errorUtils'
import { useRegisterUserMutation } from '../../authApi'
import type { AuthResultRegister } from '../../types'
import { RegisterPage } from '../RegisterPage'

vi.mock('../../../../utils/errorUtils')
vi.mock('../../authApi')

const MockHome = () => <div data-testid="mocked-home-page">Home Page</div>

const MockLogin = () => <div data-testid="mocked-login-page">LoginPage</div>

const MockRoutes = () => (
    <Routes>
        <Route path="/" element={<MockHome />} />
        <Route path="/login" element={<MockLogin />} />
        <Route path="/register" element={<RegisterPage />} />
    </Routes>
)

describe('RegisterPage', () => {
    const initialEntries = ['/register']

    const mockRegisterResult: AuthResultRegister = {
        message: 'Account created successfully',
    }

    const mockParams = {
        username: 'testuser',
        password: 'password123',
        confirmPassword: 'password123',
    }

    const mockRegisterUser = vi.fn()
    const mockUnwrap = vi.fn()

    beforeEach(() => {
        vi.mocked(useRegisterUserMutation as Mock).mockReturnValue([
            mockRegisterUser,
            { isLoading: false },
        ])

        mockRegisterUser.mockReturnValue({
            unwrap: mockUnwrap,
        })

        mockUnwrap.mockResolvedValue(mockRegisterResult)
    })

    it('renders the registration form correctly', () => {
        renderWithRouter(<MockRoutes />, initialEntries)

        expect(screen.getByText('Beautycase')).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('fields.username.label')
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('fields.password.label')
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('fields.confirmPassword.label')
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', {
                name: 'register',
            })
        ).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'login' })).toBeInTheDocument()
    })

    it('allows user to type in the fields', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const username = screen.getByPlaceholderText('fields.username.label')
        const password = screen.getByPlaceholderText('fields.password.label')
        const confirmPassword = screen.getByPlaceholderText(
            'fields.confirmPassword.label'
        )

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

        await user.type(
            screen.getByPlaceholderText('fields.username.label'),
            mockParams.username
        )

        await user.type(
            screen.getByPlaceholderText('fields.password.label'),
            mockParams.password
        )

        await user.type(
            screen.getByPlaceholderText('fields.confirmPassword.label'),
            mockParams.confirmPassword
        )

        await user.click(
            screen.getByRole('button', {
                name: 'register',
            })
        )

        expect(mockRegisterUser).toHaveBeenCalledWith(mockParams)
        expect(toast.success).toHaveBeenCalledWith(expect.any(String))
        expect(mockNavigate).toHaveBeenCalledWith('/login')
    })

    it('shows validation errors when fields are empty', async () => {
        const user = userEvent.setup()
        renderWithRouter(<MockRoutes />, initialEntries)

        await user.click(screen.getByRole('button', { name: 'register' }))

        expect(
            await screen.findByText('fields.username.errors.required')
        ).toBeInTheDocument()

        expect(
            await screen.findByText('fields.password.errors.required')
        ).toBeInTheDocument()

        expect(
            await screen.findByText('fields.confirmPassword.errors.required')
        ).toBeInTheDocument()
    })

    it('handles registration error', async () => {
        const user = userEvent.setup()

        const mockConsoleError = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        mockUnwrap.mockRejectedValue(mockError)

        renderWithRouter(<MockRoutes />, initialEntries)

        await user.type(
            screen.getByPlaceholderText('fields.username.label'),
            mockParams.username
        )

        await user.type(
            screen.getByPlaceholderText('fields.password.label'),
            mockParams.password
        )

        await user.type(
            screen.getByPlaceholderText('fields.confirmPassword.label'),
            mockParams.confirmPassword
        )

        await user.click(
            screen.getByRole('button', {
                name: 'register',
            })
        )

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

        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('navigates to login page when login link is clicked', async () => {
        const user = userEvent.setup()

        renderWithRouter(<MockRoutes />, initialEntries)

        const link = screen.getByRole('link', { name: 'login' })
        await user.click(link)

        const page = screen.getByTestId('mocked-login-page')
        expect(page).toBeInTheDocument()
    })
})
