import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useCreateToolMutation } from '@/features/tools/api/toolsApi'
import { ToolForm } from '@/features/tools/components/form/ToolForm'
import type { Tool } from '@/features/tools/types'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const ToolAdd = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('tool')

    const dispatch = useAppDispatch()
    const [createTool, { isLoading }] = useCreateToolMutation()

    const handleAddTool = async (tool: Tool) => {
        try {
            const response = await createTool(tool).unwrap()
            dispatch(clearFormData())
            navigate(ROUTES.backstage.tools.details(response.id))
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
