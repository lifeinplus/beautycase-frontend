import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import commonStyles from '@/shared/components/common/common.module.css'
import { ButtonSubmit } from '@/shared/components/ui/ButtonSubmit'
import { LogoLink } from '@/shared/components/ui/LogoLink'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { useRegisterUserMutation } from '../../features/auth/authApi'
import type { AuthQueryRegister } from '../../features/auth/types'
import { registerSchema } from '../../features/auth/validations'
import styles from './auth.module.css'

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
                            <p
                                className={classNames(
                                    commonStyles.textDanger,
                                    'form-error'
                                )}
                            >
                                {t(errors.username.message)}
                            </p>
                        )}
                    </div>
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
                        <p
                            className={classNames(
                                commonStyles.textDanger,
                                'form-error'
                            )}
                        >
                            {t(errors.password.message)}
                        </p>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        {...register('confirmPassword')}
                        className={classNames(
                            styles.input,
                            errors.confirmPassword && 'border-error'
                        )}
                        placeholder={t('fields.confirmPassword.label')}
                        type="password"
                    />

                    <label htmlFor="confirmPassword" className={styles.label}>
                        {t('fields.confirmPassword.label')}
                    </label>

                    {errors.confirmPassword?.message && (
                        <p
                            className={classNames(
                                commonStyles.textDanger,
                                'form-error'
                            )}
                        >
                            {t(errors.confirmPassword.message)}
                        </p>
                    )}
                </div>

                <div className={styles.submitContainer}>
                    <ButtonSubmit
                        isLoading={isLoading}
                        label={isLoading ? t('regstering') : t('register')}
                    />
                </div>

                <div className={styles.questionContainer}>
                    <p className={styles.question}>
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
