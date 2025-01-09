import { DynamicForm, type FieldConfig } from '../../form'
import { useGetUsersQuery } from '../../users'
import { MakeupBag } from '../types'

interface MakeupBagFormProps {
    onSubmit: (data: MakeupBag) => void
    title: string
}

export const MakeupBagForm = ({ onSubmit, title }: MakeupBagFormProps) => {
    const { data: users } = useGetUsersQuery()

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
        {
            label: 'Этапы',
            name: 'selectedStageIds',
            type: 'button-stages',
        },
        {
            label: 'Инструменты',
            name: 'selectedToolIds',
            path: '/tools/selection',
            type: 'button-tools',
        },
    ]

    return <DynamicForm title={title} fields={fields} onSubmit={onSubmit} />
}
