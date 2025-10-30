import { UseFormRegisterReturn } from 'react-hook-form'

export interface RadioButtonItemProps {
    id: string
    label: string
    register: UseFormRegisterReturn
    value?: string
}

export const RadioButtonItem = ({
    id,
    label,
    register,
    value,
}: RadioButtonItemProps) => (
    <div
        role="button"
        className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-neutral-200 focus:bg-neutral-200 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 dark:active:bg-neutral-800"
    >
        <label
            htmlFor={id}
            className="flex w-full cursor-pointer items-center px-3 py-2"
        >
            <div className="inline-flex items-center">
                <label
                    className="relative flex cursor-pointer items-center"
                    htmlFor={id}
                >
                    <input
                        id={id}
                        className="peer border-1.5 h-6 w-6 cursor-pointer appearance-none rounded-full border-black transition-all dark:border-white"
                        {...register}
                        type="radio"
                        value={value}
                    />
                    <span className="absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-neutral-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100 dark:bg-white"></span>
                </label>
                <label
                    className="ms-3 cursor-pointer text-sm text-black dark:text-white"
                    htmlFor={id}
                >
                    {label}
                </label>
            </div>
        </label>
    </div>
)
