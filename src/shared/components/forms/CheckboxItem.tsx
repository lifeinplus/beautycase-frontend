import { UseFormRegisterReturn } from 'react-hook-form'

export interface CheckboxItemProps {
    id: string
    label: string
    register: UseFormRegisterReturn
}

export const CheckboxItem = ({ id, label, register }: CheckboxItemProps) => (
    <div
        role="button"
        className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-neutral-100 focus:bg-neutral-100 active:bg-neutral-100 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900 dark:active:bg-neutral-900"
    >
        <label
            className="flex w-full cursor-pointer items-center px-3 py-2"
            htmlFor={id}
        >
            <div className="inline-flex items-center">
                <label
                    className="relative flex cursor-pointer items-center"
                    htmlFor={id}
                >
                    <input
                        id={id}
                        type="checkbox"
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded border border-black shadow transition-all checked:border-neutral-800 checked:bg-neutral-800 hover:shadow-md dark:border-white dark:checked:border-neutral-200 dark:checked:bg-neutral-200"
                        {...register}
                    />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100 dark:text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
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
