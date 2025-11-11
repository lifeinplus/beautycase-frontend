import classNames from 'classnames'
import { useEffect, useState } from 'react'

export const StartupProgress = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + 100 / 30 // 30 seconds
                return newProgress >= 100 ? 100 : newProgress
            })
        }, 1000)

        return () => {
            clearInterval(progressInterval)
        }
    }, [])

    return (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
            <div className="mx-4 flex max-w-md flex-col items-center space-y-8 p-8">
                <div className="flex items-center justify-center">
                    <h1 className="font-logo mt-4 mb-10 text-5xl md:text-6xl lg:text-7xl">
                        Beautycase
                    </h1>
                </div>

                <div className="h-1 w-64 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className={classNames(
                            'h-1 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-1000 ease-out',
                            'dark:from-rose-500 dark:to-pink-600'
                        )}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="text-base text-black dark:text-white">
                    {Math.round(progress)}%
                </div>

                <div className="space-y-2 text-center">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        Запуск сервера...
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Инициализация займёт до 30 секунд
                    </p>
                </div>

                <div className="space-y-1 text-center opacity-75">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Server is starting up...
                    </p>
                    <p className="text-gray-500 dark:text-gray-500">
                        This may take up to 30 seconds
                    </p>
                </div>
            </div>
        </div>
    )
}
