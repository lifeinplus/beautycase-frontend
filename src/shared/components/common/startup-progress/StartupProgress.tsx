import { useEffect, useState } from 'react'

import styles from './StartupProgress.module.css'

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
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.logoContainer}>
                    <h1 className={styles.logo}>Beautycase</h1>
                </div>

                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className={styles.progressIndicator}>
                    {Math.round(progress)}%
                </div>

                <div className={styles.primaryContainer}>
                    <h2 className={styles.primary}>Запуск сервера...</h2>
                    <p className={styles.primaryDescription}>
                        Инициализация займёт до 30 секунд
                    </p>
                </div>

                <div className={styles.secondaryContainer}>
                    <p className={styles.secondary}>Server is starting up...</p>
                    <p className={styles.secondaryDescription}>
                        This may take up to 30 seconds
                    </p>
                </div>
            </div>
        </div>
    )
}
