import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { useLoginUserMutation } from '@/features/auth/api/authApi'
import { setCredentials } from '@/features/auth/slice/authSlice'
import type { AuthQueryLogin } from '@/features/auth/types'
import { loginSchema } from '@/features/auth/validations'
import commonStyles from '@/shared/components/common/common.module.css'
import formStyles from '@/shared/components/forms/form.module.css'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { LogoLink } from '@/shared/components/ui/logo-link/LogoLink'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import authStyles from '../auth.module.css'

export const Login = () => {
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
        <section className={authStyles.section}>
            <form className={authStyles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={authStyles.logoContainer}>
                    <h1 className={authStyles.logo}>
                        <LogoLink />
                    </h1>
                </div>

                <div className={authStyles.inputContainer}>
                    <div className={authStyles.inputGroup}>
                        <input
                            {...restUsername}
                            className={classNames(
                                authStyles.input,
                                errors.username && authStyles.error
                            )}
                            placeholder={t('fields.username.label')}
                            ref={(e) => {
                                refUsername(e)
                                usernameRef.current = e
                            }}
                            type="text"
                        />

                        <label htmlFor="username" className={authStyles.label}>
                            {t('fields.username.label')}
                        </label>

                        {errors.username?.message && (
                            <p
                                className={classNames(
                                    commonStyles.textDanger,
                                    formStyles.error
                                )}
                            >
                                {t(errors.username.message)}
                            </p>
                        )}
                    </div>

                    <div className={authStyles.inputGroup}>
                        <input
                            {...register('password')}
                            className={classNames(
                                authStyles.input,
                                errors.password && authStyles.error
                            )}
                            placeholder={t('fields.password.label')}
                            type="password"
                        />

                        <label htmlFor="password" className={authStyles.label}>
                            {t('fields.password.label')}
                        </label>

                        {errors.password?.message && (
                            <p
                                className={classNames(
                                    commonStyles.textDanger,
                                    formStyles.error
                                )}
                            >
                                {t(errors.password.message)}
                            </p>
                        )}
                    </div>

                    <div className={authStyles.submitContainer}>
                        <ButtonSubmit
                            isLoading={isLoading}
                            label={isLoading ? t('loggingIn') : t('login')}
                        />
                    </div>
                </div>

                <div className={authStyles.questionContainer}>
                    <p className={authStyles.question}>
                        {t('loginQuestion')}{' '}
                        <Link
                            className={classNames(
                                commonStyles.focusOutline,
                                commonStyles.textDanger,
                                'font-semibold'
                            )}
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
