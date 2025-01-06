import { useNavigate, useParams } from 'react-router-dom'

import { DynamicForm, type FieldConfig } from '../../form'
import { useGetUsersQuery } from '../../users'
import { MakeupBag } from '../types'

interface MakeupBagFormProps {
    onSubmit: (data: MakeupBag) => void
    title: string
}

export const MakeupBagForm = ({ onSubmit, title }: MakeupBagFormProps) => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: users, isLoading, isError } = useGetUsersQuery()

    const fields: FieldConfig<MakeupBag>[] = [
        {
            label: 'Клиент',
            name: 'clientId',
            options: users?.map((u) => ({
                text: u.username,
                value: u._id,
            })),
            required: true,
            type: 'select',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}
