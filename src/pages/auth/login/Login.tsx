import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { useLoginUserMutation } from '@/features/auth/api/authApi'
import { loginFields } from '@/features/auth/login/fields/loginFields'
import { setCredentials } from '@/features/auth/slice/authSlice'
import type { AuthQueryLogin } from '@/features/auth/types'
import { loginSchema } from '@/features/auth/validations'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { LogoLink } from '@/shared/components/ui/logo-link/LogoLink'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { ApiError } from '../ui/ApiError'
import { InputSection } from '../ui/InputSection'

export const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { t } = useTranslation('auth')
    const [apiError, setFormError] = useState<string>()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<AuthQueryLogin>({
        resolver: yupResolver(loginSchema),
    })

    const dispatch = useAppDispatch()
    const [loginUser, { isLoading }] = useLoginUserMutation()

    const from = location.state?.from?.pathname || ROUTES.home

    const onSubmit = async (data: AuthQueryLogin) => {
        setFormError('')
        const { username, password } = data

        try {
            const response = await loginUser({ username, password }).unwrap()
            dispatch(setCredentials(response))
            navigate(from, { replace: true })
        } catch (error) {
            console.error(error)
            setFormError(getErrorMessage(error))
        }
    }

    watch(() => {
        if (apiError) setFormError('')
    })

    return (
        <section className="max-w-login mx-auto flex min-h-screen flex-1 flex-col justify-center md:mx-auto md:w-full">
            <form
                className="px-10 md:rounded-xl md:border md:border-neutral-300 dark:border-neutral-700"
                onSubmit={handleSubmit(onSubmit)}
            >
                <section className="mb-14 md:mx-auto md:mt-10 md:w-full">
                    <h1 className="font-logo text-center align-baseline text-5xl">
                        <LogoLink />
                    </h1>
                </section>

                {apiError && (
                    <section className="mb-10">
                        <ApiError text={apiError} />
                    </section>
                )}

                <div className="space-y-5">
                    <InputSection
                        id="username"
                        register={register('username')}
                        label={t(loginFields.username.label)}
                        error={t(errors.username?.message || '')}
                        autoComplete="username"
                        type="text"
                    />

                    <InputSection
                        id="password"
                        register={register('password')}
                        label={t(loginFields.password.label)}
                        error={t(errors.password?.message || '')}
                        autoComplete="current-password"
                        type="password"
                    />
                </div>

                <section className="mt-9">
                    <ButtonSubmit
                        isLoading={isLoading}
                        label={isLoading ? t('loggingIn') : t('login')}
                    />
                </section>

                <div className="mt-12 md:mb-6">
                    <p className="text-center text-base text-neutral-500 dark:text-neutral-400">
                        {t('loginQuestion')}{' '}
                        <Link
                            className={classNames(
                                'font-semibold text-rose-500 transition-all dark:text-rose-400 dark:focus-visible:outline-rose-700',
                                'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed'
                            )}
                            to={ROUTES.register}
                        >
                            {t('register')}
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    )
}
