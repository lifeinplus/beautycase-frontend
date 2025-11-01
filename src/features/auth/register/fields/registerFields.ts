import type { AuthFields } from '../../types'

export const registerFields: AuthFields = {
    firstName: {
        label: 'fields.firstName.label',
    },
    lastName: {
        label: 'fields.lastName.label',
    },
    username: {
        label: 'fields.username.label',
    },
    password: {
        label: 'fields.password.label',
    },
    confirmPassword: {
        label: 'fields.confirmPassword.label',
    },
    role: {
        label: 'fields.role.label',
        options: [
            {
                id: 'role-client',
                label: 'fields.role.options.client',
                name: 'role',
                value: 'client',
            },
            {
                id: 'role-mua',
                label: 'fields.role.options.mua',
                name: 'role',
                value: 'mua',
            },
        ],
    },
}
