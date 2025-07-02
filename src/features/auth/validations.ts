import { object, ref, string } from 'yup'

export const loginSchema = object({
    username: string().required('fields.username.errors.required'),
    password: string().required('fields.password.errors.required'),
})

export const registerSchema = object({
    username: string()
        .required('fields.username.errors.required')
        .min(3, 'fields.username.errors.min')
        .max(20, 'fields.username.errors.max'),
    password: string()
        .required('fields.password.errors.required')
        .min(8, 'fields.password.errors.min'),
    confirmPassword: string()
        .oneOf([ref('password')], 'fields.confirmPassword.errors.match')
        .required('fields.confirmPassword.errors.required'),
})
