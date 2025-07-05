import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { ButtonSubmit } from '../../../shared/components/ui/ButtonSubmit'
import { LogoLink } from '../../../shared/components/ui/LogoLink'
import { getErrorMessage } from '../../../shared/utils/errorUtils'
import { useLoginUserMutation } from '../authApi'
import { setCredentials } from '../authSlice'
import type { AuthQueryLogin } from '../types'
import { loginSchema } from '../validations'

export const LoginPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { t } = useTranslation('auth')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthQueryLogin>({
        resolver: yupResolver(loginSchema),
    })

    const usernameRef = useRef<HTMLInputElement | null>(null)

    const dispatch = useAppDispatch()
    const [loginUser, { isLoading }] = useLoginUserMutation()

    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        usernameRef.current?.focus()
    }, [])

    const onSubmit = async (data: AuthQueryLogin) => {
        const { username, password } = data

        try {
            const response = await loginUser({ username, password }).unwrap()
            dispatch(setCredentials(response))
            navigate(from, { replace: true })
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
                        <LogoLink />
                    </h1>
                </div>

                <div className="mt-14">
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

                        {errors.username?.message && (
                            <p className="form-error text-danger">
                                {t(errors.username.message)}
                            </p>
                        )}
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

                        {errors.password?.message && (
                            <p className="form-error text-danger">
                                {t(errors.password.message)}
                            </p>
                        )}
                    </div>

                    <div className="auth-submit-container">
                        <ButtonSubmit
                            isLoading={isLoading}
                            label={isLoading ? t('loggingIn') : t('login')}
                        />
                    </div>
                </div>

                <div className="auth-question-container">
                    <p className="auth-question">
                        {t('loginQuestion')}{' '}
                        <Link
                            className="text-danger focus-outline font-semibold"
                            to="/register"
                        >
                            {t('register')}
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    )
}
