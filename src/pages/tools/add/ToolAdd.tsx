import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { clearFormData } from '@/features/form/formSlice'
import { ToolForm } from '@/features/tools/components/ToolForm'
import { useCreateToolMutation } from '@/features/tools/toolsApi'
import type { Tool } from '@/features/tools/types'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const ToolAdd = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('tool')

    const dispatch = useAppDispatch()
    const [createTool, { isLoading }] = useCreateToolMutation()

    const handleAddTool = async (tool: Tool) => {
        try {
            const response = await createTool(tool).unwrap()
            dispatch(clearFormData())
            navigate(`/tools/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <ToolForm
            title={t('titles.add')}
            onSubmit={handleAddTool}
            isSaving={isLoading}
        />
    )
}
