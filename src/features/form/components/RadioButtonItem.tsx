import { UseFormRegisterReturn } from 'react-hook-form'

interface RadioButtonItemProps {
    id: string
    label: string
    register: UseFormRegisterReturn
}

export const RadioButtonItem = ({
    id,
    label,
    register,
}: RadioButtonItemProps) => (
    <div
        role="button"
        className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 dark:hover:bg-slate-900 dark:focus:bg-slate-900 dark:active:bg-slate-900"
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
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition-all checked:border-slate-400 dark:border-slate-700 dark:checked:border-slate-600"
                        type="radio"
                        {...register}
                    />
                    <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-slate-800 opacity-0 transition-opacity duration-200 peer-checked:opacity-100 dark:bg-slate-200"></span>
                </label>
                <label
                    className="ml-2 cursor-pointer text-sm text-slate-600 dark:text-slate-400"
                    htmlFor={id}
                >
                    {label}
                </label>
            </div>
        </label>
    </div>
)
