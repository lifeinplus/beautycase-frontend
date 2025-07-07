import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { ButtonSubmit } from '@/shared/components/ui/ButtonSubmit'
import { LogoLink } from '@/shared/components/ui/LogoLink'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { useLoginUserMutation } from '../../features/auth/authApi'
import { setCredentials } from '../../features/auth/authSlice'
import type { AuthQueryLogin } from '../../features/auth/types'
import { loginSchema } from '../../features/auth/validations'
import styles from './auth.module.css'

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
        <section className={styles.section}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.logoContainer}>
                    <h1 className={styles.logo}>
                        <LogoLink />
                    </h1>
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.inputGroup}>
                        <input
                            {...restUsername}
                            className={classNames(
                                styles.input,
                                errors.username && 'border-error'
                            )}
                            placeholder={t('fields.username.label')}
                            ref={(e) => {
                                refUsername(e)
                                usernameRef.current = e
                            }}
                            type="text"
                        />

                        <label htmlFor="username" className={styles.label}>
                            {t('fields.username.label')}
                        </label>

                        {errors.username?.message && (
                            <p className="form-error text-danger">
                                {t(errors.username.message)}
                            </p>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            {...register('password')}
                            className={classNames(
                                styles.input,
                                errors.password && 'border-error'
                            )}
                            placeholder={t('fields.password.label')}
                            type="password"
                        />

                        <label htmlFor="password" className={styles.label}>
                            {t('fields.password.label')}
                        </label>

                        {errors.password?.message && (
                            <p className="form-error text-danger">
                                {t(errors.password.message)}
                            </p>
                        )}
                    </div>

                    <div className={styles.submitContainer}>
                        <ButtonSubmit
                            isLoading={isLoading}
                            label={isLoading ? t('loggingIn') : t('login')}
                        />
                    </div>
                </div>

                <div className={styles.questionContainer}>
                    <p className={styles.question}>
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
