interface LabelProps {
    children?: React.ReactNode
    required?: boolean
    text: string
}

export const Label = ({ children, required, text }: LabelProps) => (
    <label className="block">
        <span className="form-label">
            {text}
            {required && <span className="text-error"> *</span>}
        </span>

        {children}
    </label>
)
