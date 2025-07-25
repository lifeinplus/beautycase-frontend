import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import commonStyles from '@/shared/components/common/common.module.css'
import styles from './TopPanel.module.css'

export interface TopPanelProps {
    title: string
    onBack?: () => void
}

export const TopPanel = ({ title, onBack }: TopPanelProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <nav className={styles.container}>
            <div className="flex items-center justify-between px-4 py-2.5">
                <button
                    className={classNames(
                        commonStyles.focusOutline,
                        styles.btn
                    )}
                    onClick={onBack || handleBack}
                >
                    <ChevronLeftIcon className="h-7 w-7" />
                </button>
                <h2 aria-label="Top Panel Title" className={styles.title}>
                    {title}
                </h2>
                <div className="w-8"></div>
            </div>
        </nav>
    )
}
