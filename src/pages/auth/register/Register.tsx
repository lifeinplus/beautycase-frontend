import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { useRegisterUserMutation } from '@/features/auth/api/authApi'
import { authRegisterFields } from '@/features/auth/register/fields/authRegisterFields'
import type { AuthQueryRegister } from '@/features/auth/types'
import { registerSchema } from '@/features/auth/validations'
import { RadioButtonSection } from '@/shared/components/forms/radio-button/section/RadioButtonSection'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { LogoLink } from '@/shared/components/ui/logo-link/LogoLink'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { InputSection } from './ui/InputSection'

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

    const [registerUser, { isLoading }] = useRegisterUserMutation()

    const onSubmit = async (data: AuthQueryRegister) => {
        const { username, password, confirmPassword, role } = data

        try {
            await registerUser({
                username,
                password,
                confirmPassword,
                role,
            }).unwrap()

            navigate(ROUTES.login)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <section className="md:max-w-register mx-auto flex min-h-screen max-w-96 flex-1 flex-col justify-center md:mx-auto md:w-full">
            <form
                className="px-7 md:rounded-xl md:border md:border-neutral-300 md:px-10 dark:border-neutral-700"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-14 md:mx-auto md:mt-12 md:w-full">
                    <h1 className="font-logo text-center align-baseline text-5xl">
                        <LogoLink />
                    </h1>
                </div>

                <InputSection
                    id="username"
                    register={register('username')}
                    label={t(authRegisterFields.username.label)}
                    error={t(errors.username?.message || '')}
                    autoComplete="username"
                    type="text"
                />

                <InputSection
                    id="password"
                    register={register('password')}
                    label={t(authRegisterFields.password.label)}
                    error={t(errors.password?.message || '')}
                    autoComplete="new-password"
                    type="password"
                />

                <InputSection
                    id="confirmPassword"
                    register={register('confirmPassword')}
                    label={t(authRegisterFields.confirmPassword.label)}
                    error={t(errors.confirmPassword?.message || '')}
                    autoComplete="new-password"
                    type="password"
                />

                <RadioButtonSection
                    register={register('role')}
                    label={authRegisterFields.role.label}
                    error={errors.role?.message}
                    options={authRegisterFields.role.options}
                    center
                    horizontal
                    t={t}
                />

                <section className="mt-9">
                    <ButtonSubmit
                        isLoading={isLoading}
                        label={isLoading ? t('regstering') : t('register')}
                    />
                </section>

                <section className="mt-12 md:mb-6">
                    <p className="text-center text-base text-neutral-500 dark:text-neutral-400">
                        {t('registerQuestion')}{' '}
                        <Link
                            className={classNames(
                                'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                                'dark:focus-visible:outline-rose-700',
                                'text-rose-500 dark:text-rose-400',
                                'font-semibold'
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
