import {
    ArrowDownCircleIcon,
    ArrowLeftIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import {
    AdaptiveNavBar,
    Button,
    Hero,
    Input,
    NavigationButton,
    TopPanel,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import {
    StoresTable,
    useCreateStoreMutation,
    useReadStoresQuery,
    useUpdateStoreMutation,
} from '../../stores'

export const StoresPage = () => {
    const navigate = useNavigate()

    const { data: stores, isLoading, isError } = useReadStoresQuery()
    const [createStore] = useCreateStoreMutation()
    const [updateStore] = useUpdateStoreMutation()

    const [storeName, setStoreName] = useState('')
    const [editId, setEditId] = useState<string | null>(null)

    const handleBack = () => {
        navigate('/reference_lists')
    }

    const handleAddStore = async () => {
        if (storeName.trim() === '') return

        try {
            await createStore({ name: storeName }).unwrap()
            setStoreName('')
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleUpdateStore = async () => {
        try {
            if (editId) {
                await updateStore({
                    id: editId,
                    body: { name: storeName },
                }).unwrap()
                setEditId(null)
                setStoreName('')
            }
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    useEffect(() => {
        if (isError) {
            console.error('Failed to fetch stores')
        }
    }, [isError])

    return (
        <article>
            <TopPanel title="Магазины" onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero headline="Магазины" />
                    </div>

                    <div className="mb-4 flex gap-2">
                        <Input
                            className="flex-grow"
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="Магазин"
                            type="text"
                            value={storeName}
                        />
                        <Button
                            variant={editId ? 'warning' : 'success'}
                            onClick={
                                editId ? handleUpdateStore : handleAddStore
                            }
                            className="min-w-[100px]"
                        >
                            {editId ? (
                                <ArrowDownCircleIcon className="h-6 w-6" />
                            ) : (
                                <PlusCircleIcon className="h-6 w-6" />
                            )}
                        </Button>
                    </div>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <StoresTable
                            stores={stores}
                            setStoreName={setStoreName}
                            setEditId={setEditId}
                        />
                    )}
                </article>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text="Назад"
                    onClick={handleBack}
                    className="nav-btn-back"
                />
            </AdaptiveNavBar>
        </article>
    )
}
