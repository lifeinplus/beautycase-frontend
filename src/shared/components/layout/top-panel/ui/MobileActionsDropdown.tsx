import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

import type { NavBarAction } from '@/app/layout/hooks/types'

export interface MobileActionsDropdownProps {
    actions: NavBarAction[]
}

export const MobileActionsDropdown = ({
    actions,
}: MobileActionsDropdownProps) => {
    return (
        <Menu as="div" className="relative">
            <MenuButton
                className={classNames(
                    'flex items-center pe-2.5 text-black dark:text-white',
                    'transition-all focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700'
                )}
            >
                <EllipsisHorizontalIcon className="size-7" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className={classNames(
                    'rounded-2.5xl mt-3.5 w-72 origin-top-right bg-white/90 p-1 text-lg outline-1 -outline-offset-1 outline-black/10 backdrop-blur-xs transition dark:bg-black/80 dark:outline-white/30',
                    'data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
                )}
            >
                {actions.map(
                    ({ key, onClick, icon: Icon, label, destructive }) => (
                        <div key={key}>
                            {destructive && (
                                <div className="h-px bg-white/30" />
                            )}
                            <MenuItem>
                                <button
                                    onClick={onClick}
                                    className={classNames(
                                        'group flex w-full items-center justify-between gap-2 py-3 ps-6 pe-4',
                                        'data-focus:bg-black/5 data-focus:outline-hidden dark:data-focus:bg-white/10',
                                        destructive
                                            ? 'text-rose-500 dark:text-rose-400'
                                            : 'text-black dark:text-white'
                                    )}
                                >
                                    {label}
                                    <Icon className="size-6 stroke-2" />
                                </button>
                            </MenuItem>
                        </div>
                    )
                )}
            </MenuItems>
        </Menu>
    )
}
