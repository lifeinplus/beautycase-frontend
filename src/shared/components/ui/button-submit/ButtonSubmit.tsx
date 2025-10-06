import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

import commonStyles from '@/shared/components/common/common.module.css'
import { SpinnerButton } from '../../common/spinner-button/SpinnerButton'
import styles from './ButtonSubmit.module.css'

export interface ButtonSubmitProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
    label?: string
}

export const ButtonSubmit = ({
    className,
    isLoading = false,
    label = '',
    ...props
}: ButtonSubmitProps) => (
    <button
        {...props}
        className={classNames(
            styles.btn,
            commonStyles.focusOutline,
            className,
            isLoading && `${styles.loading} cursor-not-allowed`
        )}
        disabled={isLoading}
        type="submit"
    >
        {isLoading && <SpinnerButton />}
        {label}
    </button>
)
