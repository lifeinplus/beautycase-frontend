import { FormEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { isDataMessageError, isFetchBaseQueryError } from '../../utils'
import { useLoginUserMutation } from './authApi'
import { setCredentials } from './authSlice'

export const LoginPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const usernameRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, { isLoading }] = useLoginUserMutation()

    const from = location.state?.from?.pathname || '/makeup-bag'

    useEffect(() => {
        usernameRef.current?.focus()
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const response = await login({ username, password }).unwrap()
            dispatch(setCredentials(response))
            navigate(from, { replace: true })
        } catch (err) {
            if (isDataMessageError(err)) {
                const { details, message } = err.data
                toast.error(details ? details?.join(', ') : message)
            } else if (isFetchBaseQueryError(err)) {
                const errMsg =
                    'error' in err ? err.error : JSON.stringify(err.data)
                toast.error(errMsg)
            } else {
                console.error(err)
            }
        }
    }

    return (
        <>
            <section className="mx-auto flex min-h-screen max-w-80 flex-1 flex-col justify-center py-2.5 sm:mx-auto sm:w-full sm:max-w-login">
                <form
                    className="mb-2.5 py-2.5 dark:border-neutral-700 sm:rounded-sm sm:border sm:border-neutral-300"
                    onSubmit={handleSubmit}
                >
                    <div className="sm:mx-auto sm:mt-9 sm:w-full">
                        <h1 className="text-center align-baseline font-logo text-4xl">
                            <a
                                href="/"
                                className="focus-visible:outline-rose-700"
                            >
                                Beautycase
                            </a>
                        </h1>
                    </div>

                    <div className="mt-12">
                        <div className="relative mx-6 mb-1.5 sm:mx-10">
                            <input
                                id="username"
                                className="peer w-full rounded-sm border bg-neutral-50 pb-1 ps-2 pt-4 text-sm placeholder-transparent focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                                type="text"
                                ref={usernameRef}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Имя пользователя"
                            />
                            <label
                                htmlFor="username"
                                className="absolute start-2 top-1 transform text-xs text-neutral-400 transition-all peer-placeholder-shown:start-2.5 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:start-2 peer-focus:top-1 peer-focus:text-xs dark:text-neutral-400"
                            >
                                Имя пользователя
                            </label>
                        </div>

                        <div className="relative mx-6 mb-1.5 sm:mx-10">
                            <input
                                className="peer w-full rounded-sm border bg-neutral-50 pb-1 ps-2 pt-4 text-sm placeholder-transparent focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Пароль"
                            />
                            <label
                                htmlFor="password"
                                className="absolute start-2 top-1 transform text-xs text-neutral-400 transition-all peer-placeholder-shown:start-2.5 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:start-2 peer-focus:top-1 peer-focus:text-xs dark:text-neutral-400"
                            >
                                Пароль
                            </label>
                        </div>

                        <div className="mx-6 mb-2 mt-3.5 sm:mx-10">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-rose-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-700"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Вход...' : 'Войти'}
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 sm:mb-5">
                        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                            У вас ещё нет аккаунта?{' '}
                            <a
                                href="#"
                                className="font-semibold text-rose-500 hover:text-rose-400 focus-visible:outline-rose-700"
                            >
                                Зарегистрироваться
                            </a>
                        </p>
                    </div>
                </form>
            </section>
        </>
    )
}
