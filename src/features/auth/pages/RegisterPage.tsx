import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { getErrorMessage } from '../../../utils/errorUtils'
import { useRegisterUserMutation } from '../authApi'
import type { AuthQueryRegister } from '../types'
import { registerSchema } from '../validations'

export const RegisterPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('auth')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthQueryRegister>({
        resolver: yupResolver(registerSchema),
    })

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const [registerUser, { isLoading }] = useRegisterUserMutation()

    useEffect(() => {
        usernameRef.current?.focus()
    }, [])

    const onSubmit = async (data: AuthQueryRegister) => {
        const { username, password, confirmPassword } = data

        try {
            const response = await registerUser({
                username,
                password,
                confirmPassword,
            }).unwrap()

            toast.success(response.message)
            navigate('/login')
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const { ref: refUsername, ...restUsername } = register('username')

    return (
        <section className="auth-section">
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-logo-container">
                    <h1 className="auth-logo">
                        <Link className="auth-logo-link" to="/">
                            Beautycase
                        </Link>
                    </h1>
                </div>

                <div className="mt-12">
                    <div className="auth-input-group">
                        <input
                            {...restUsername}
                            className={classNames(
                                'auth-input peer',
                                errors.username && 'border-error'
                            )}
                            placeholder={t('fields.username.label')}
                            ref={(e) => {
                                refUsername(e)
                                usernameRef.current = e
                            }}
                            type="text"
                        />

                        <label htmlFor="username" className="auth-label">
                            {t('fields.username.label')}
                        </label>

                        {errors.username && (
                            <p className="form-error">
                                {t(errors.username.message || '')}
                            </p>
                        )}
                    </div>
                </div>

                <div className="auth-input-group">
                    <input
                        {...register('password')}
                        className={classNames(
                            'auth-input peer',
                            errors.password && 'border-error'
                        )}
                        placeholder={t('fields.password.label')}
                        type="password"
                    />

                    <label htmlFor="password" className="auth-label">
                        {t('fields.password.label')}
                    </label>

                    {errors.password && (
                        <p className="form-error">
                            {t(errors.password.message || '')}
                        </p>
                    )}
                </div>

                <div className="auth-input-group">
                    <input
                        {...register('confirmPassword')}
                        className={classNames(
                            'auth-input peer',
                            errors.confirmPassword && 'border-error'
                        )}
                        placeholder={t('fields.confirmPassword.label')}
                        type="password"
                    />

                    <label htmlFor="confirmPassword" className="auth-label">
                        {t('fields.confirmPassword.label')}
                    </label>

                    {errors.confirmPassword && (
                        <p className="form-error">
                            {t(errors.confirmPassword.message || '')}
                        </p>
                    )}
                </div>

                <div className="auth-submit-container">
                    <button
                        type="submit"
                        className={classNames(
                            'auth-submit',
                            isLoading && 'auth-submit-loading'
                        )}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="auth-spinner" />
                        ) : (
                            t('register')
                        )}
                    </button>
                </div>

                <div className="auth-question-container">
                    <p className="auth-question">
                        {t('registerQuestion')}{' '}
                        <Link className="auth-question-link" to="/login">
                            {t('login')}
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    )
}
