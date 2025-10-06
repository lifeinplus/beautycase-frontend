import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { useRegisterUserMutation } from '@/features/auth/api/authApi'
import type { AuthQueryRegister } from '@/features/auth/types'
import { registerSchema } from '@/features/auth/validations'
import commonStyles from '@/shared/components/common/common.module.css'
import formStyles from '@/shared/components/forms/form.module.css'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { LogoLink } from '@/shared/components/ui/logo-link/LogoLink'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import authStyles from '../auth.module.css'

export const Register = () => {
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

                <div className={authStyles.inputGroup}>
                    <input
                        {...register('confirmPassword')}
                        className={classNames(
                            authStyles.input,
                            errors.confirmPassword && authStyles.error
                        )}
                        placeholder={t('fields.confirmPassword.label')}
                        type="password"
                    />

                    <label
                        htmlFor="confirmPassword"
                        className={authStyles.label}
                    >
                        {t('fields.confirmPassword.label')}
                    </label>

                    {errors.confirmPassword?.message && (
                        <p
                            className={classNames(
                                commonStyles.textDanger,
                                formStyles.error
                            )}
                        >
                            {t(errors.confirmPassword.message)}
                        </p>
                    )}
                </div>

                <div className={authStyles.submitContainer}>
                    <ButtonSubmit
                        isLoading={isLoading}
                        label={isLoading ? t('regstering') : t('register')}
                    />
                </div>

                <div className={authStyles.questionContainer}>
                    <p className={authStyles.question}>
                        {t('registerQuestion')}{' '}
                        <Link
                            className={classNames(
                                commonStyles.focusOutline,
                                commonStyles.textDanger,
                                'font-semibold'
                            )}
                            to="/login"
                        >
                            {t('login')}
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    )
}
