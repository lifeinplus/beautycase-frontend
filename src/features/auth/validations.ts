import { object, ref, string } from 'yup'
import { transformEmpty } from '../questionnaires/utils'

export const loginSchema = object({
    username: string()
        .trim()
        .lowercase()
        .required('fields.username.errors.required'),
    password: string().trim().required('fields.password.errors.required'),
})

export const registerSchema = object({
    firstName: string()
        .trim()
        .required('fields.firstName.errors.required')
        .min(2, 'fields.firstName.errors.min')
        .max(20, 'fields.firstName.errors.max'),
    lastName: string()
        .trim()
        .required('fields.lastName.errors.required')
        .min(2, 'fields.lastName.errors.min')
        .max(20, 'fields.lastName.errors.max'),
    username: string()
        .trim()
        .lowercase()
        .required('fields.username.errors.required')
        .min(3, 'fields.username.errors.min')
        .max(20, 'fields.username.errors.max'),
    password: string()
        .trim()
        .required('fields.password.errors.required')
        .min(8, 'fields.password.errors.min'),
    confirmPassword: string()
        .trim()
        .oneOf([ref('password')], 'fields.confirmPassword.errors.match')
        .required('fields.confirmPassword.errors.required'),
    role: string()
        .required('fields.role.errors.required')
        .transform(transformEmpty),
})
