import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { useRegisterUserMutation } from '@/features/auth/api/authApi'
import { registerFields } from '@/features/auth/register/fields/registerFields'
import type { AuthQueryRegister } from '@/features/auth/types'
import { registerSchema } from '@/features/auth/validations'
import { RadioButtonSection } from '@/shared/components/forms/radio-button/section/RadioButtonSection'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { LogoLink } from '@/shared/components/ui/logo-link/LogoLink'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { ApiError } from '../ui/ApiError'
import { InputSection } from '../ui/InputSection'

export const Register = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('auth')
    const [apiError, setFormError] = useState<string>()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<AuthQueryRegister>({
        resolver: yupResolver(registerSchema),
    })

    const [registerUser, { isLoading }] = useRegisterUserMutation()

    const onSubmit = async (data: AuthQueryRegister) => {
        setFormError('')

        try {
            await registerUser(data).unwrap()
            navigate(ROUTES.login)
        } catch (error) {
            console.error(error)
            setFormError(getErrorMessage(error))
        }
    }

    watch(() => {
        if (apiError) setFormError('')
    })

    return (
        <section className="max-w-register md:max-w-register-md mx-auto flex min-h-screen flex-1 flex-col justify-center md:mx-auto md:w-full">
            <form
                className="px-7 md:rounded-xl md:border md:border-neutral-300 md:px-10 dark:border-neutral-700"
                onSubmit={handleSubmit(onSubmit)}
            >
                <section className="mb-14 md:mx-auto md:mt-12 md:w-full">
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
                    <RadioButtonSection
                        register={register('role')}
                        label={registerFields.role.label}
                        error={errors.role?.message}
                        options={registerFields.role.options}
                        center
                        horizontal
                        t={t}
                    />

                    <InputSection
                        id="firstName"
                        register={register('firstName')}
                        label={t(registerFields.firstName.label)}
                        error={t(errors.firstName?.message || '')}
                        autoComplete="name"
                        type="text"
                    />

                    <InputSection
                        id="lastName"
                        register={register('lastName')}
                        label={t(registerFields.lastName.label)}
                        error={t(errors.lastName?.message || '')}
                        autoComplete="family-name"
                        type="text"
                    />

                    <InputSection
                        id="username"
                        register={register('username')}
                        label={t(registerFields.username.label)}
                        error={t(errors.username?.message || '')}
                        autoCapitalize="none"
                        autoComplete="username"
                        type="text"
                    />

                    <InputSection
                        id="password"
                        register={register('password')}
                        label={t(registerFields.password.label)}
                        error={t(errors.password?.message || '')}
                        autoComplete="new-password"
                        type="password"
                    />

                    <InputSection
                        id="confirmPassword"
                        register={register('confirmPassword')}
                        label={t(registerFields.confirmPassword.label)}
                        error={t(errors.confirmPassword?.message || '')}
                        autoComplete="new-password"
                        type="password"
                    />
                </div>

                <section className="mt-9">
                    <ButtonSubmit
                        isLoading={isLoading}
                        label={isLoading ? t('registering') : t('register')}
                    />
                </section>

                <section className="mt-12 md:mb-6">
                    <p className="text-center text-base text-neutral-500 dark:text-neutral-400">
                        {t('registerQuestion')}{' '}
                        <Link
                            className={classNames(
                                'font-semibold text-rose-500 transition-all dark:text-rose-400 dark:focus-visible:outline-rose-700',
                                'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed'
                            )}
                            to={ROUTES.login}
                        >
                            {t('login')}
                        </Link>
                    </p>
                </section>
            </form>
        </section>
    )
}
