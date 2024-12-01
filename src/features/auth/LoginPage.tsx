import { FormEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useLoginMutation } from './authApi'
import { setCredentials } from './authSlice'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        usernameRef.current?.focus()
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await login({ username, password }).unwrap()
            dispatch(setCredentials(response))
        } catch (err) {
            console.error('Failed to log in', err)
        }
    }

    return (
        <section className="flex min-h-screen flex-col items-center justify-center">
            <form
                className="rounded border border-neutral-300 p-6 shadow-lg dark:border-neutral-700"
                onSubmit={handleSubmit}
            >
                <h1 className="font-logo text-4xl font-bold">
                    <a href="/">Beautycase</a>
                </h1>
                <div className="mb-4">
                    <input
                        ref={usernameRef}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full rounded border p-2 text-neutral-800 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full rounded border p-2 text-neutral-800 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </section>
    )
}
