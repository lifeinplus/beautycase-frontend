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
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { LogoLink } from '@/shared/components/ui/logo-link/LogoLink'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

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
        <section className="sm:max-w-login mx-auto flex min-h-screen max-w-80 flex-1 flex-col justify-center py-2.5 sm:mx-auto sm:w-full">
            <form
                className="mb-2.5 py-2.5 sm:rounded-sm sm:border sm:border-neutral-300 dark:border-neutral-700"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="sm:mx-auto sm:mt-10 sm:w-full">
                    <h1 className="font-logo text-center align-baseline text-5xl">
                        <LogoLink />
                    </h1>
                </div>

                <div className="mt-14">
                    <div className="relative mx-3 mb-2 sm:mx-10">
                        <input
                            {...restUsername}
                            className={classNames(
                                'peer w-full rounded-sm border bg-neutral-50 ps-2 pt-4 pb-1 text-base placeholder-transparent focus:outline-none',
                                'dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200',
                                errors.username &&
                                    'border-rose-500 dark:border-rose-400'
                            )}
                            placeholder={t('fields.username.label')}
                            ref={(e) => {
                                refUsername(e)
                                usernameRef.current = e
                            }}
                            type="text"
                        />

                        <label
                            htmlFor="username"
                            className={classNames(
                                'pointer-events-none absolute start-2 top-1 transform text-xs text-neutral-400 transition-all dark:text-neutral-400',
                                'peer-placeholder-shown:start-2.5 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base',
                                'peer-focus:start-2 peer-focus:top-1 peer-focus:text-xs'
                            )}
                        >
                            {t('fields.username.label')}
                        </label>

                        {errors.username?.message && (
                            <p
                                className={classNames(
                                    'text-rose-500 dark:text-rose-400',
                                    'mt-2 text-sm'
                                )}
                            >
                                {t(errors.username.message)}
                            </p>
                        )}
                    </div>

                    <div className="relative mx-3 mb-2 sm:mx-10">
                        <input
                            {...register('password')}
                            className={classNames(
                                'peer w-full rounded-sm border bg-neutral-50 ps-2 pt-4 pb-1 text-base placeholder-transparent focus:outline-none',
                                'dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200',
                                errors.password &&
                                    'border-rose-500 dark:border-rose-400'
                            )}
                            placeholder={t('fields.password.label')}
                            type="password"
                        />

                        <label
                            htmlFor="password"
                            className={classNames(
                                'pointer-events-none absolute start-2 top-1 transform text-xs text-neutral-400 transition-all dark:text-neutral-400',
                                'peer-placeholder-shown:start-2.5 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base',
                                'peer-focus:start-2 peer-focus:top-1 peer-focus:text-xs'
                            )}
                        >
                            {t('fields.password.label')}
                        </label>

                        {errors.password?.message && (
                            <p
                                className={classNames(
                                    'text-rose-500 dark:text-rose-400',
                                    'mt-2 text-sm'
                                )}
                            >
                                {t(errors.password.message)}
                            </p>
                        )}
                    </div>

                    <div className="mx-3 mt-6 mb-2 sm:mx-10">
                        <ButtonSubmit
                            isLoading={isLoading}
                            label={isLoading ? t('loggingIn') : t('login')}
                        />
                    </div>
                </div>

                <div className="mt-12 sm:mb-6">
                    <p className="text-center text-base text-neutral-500 dark:text-neutral-400">
                        {t('loginQuestion')}{' '}
                        <Link
                            className={classNames(
                                'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                                'dark:focus-visible:outline-rose-700',
                                'text-rose-500 dark:text-rose-400',
                                'font-semibold'
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
