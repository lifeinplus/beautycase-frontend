import {
    ArrowDownCircleIcon,
    ArrowLeftIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import {
    AdaptiveNavBar,
    Button,
    DataWrapper,
    Hero,
    Input,
    NavigationButton,
    TopPanel,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import {
    BrandsMobileView,
    BrandsTable,
    useCreateBrandMutation,
    useReadBrandsQuery,
    useUpdateBrandMutation,
} from '../../brands'

export const BrandsPage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useReadBrandsQuery()
    const [createBrand] = useCreateBrandMutation()
    const [updateBrand] = useUpdateBrandMutation()

    const [brandName, setBrandName] = useState('')
    const [editId, setEditId] = useState<string | null>(null)

    const handleBack = () => {
        navigate('/reference_lists')
    }

    const handleAddBrand = async () => {
        if (brandName.trim() === '') return

        try {
            await createBrand({ name: brandName }).unwrap()
            setBrandName('')
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleUpdateBrand = async () => {
        try {
            if (editId) {
                await updateBrand({
                    id: editId,
                    body: { name: brandName },
                }).unwrap()
                setEditId(null)
                setBrandName('')
            }
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <article>
            <TopPanel title="Бренды" onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero headline="Бренды" />
                    </div>

                    <div className="my-6 flex gap-3 pe-4 ps-4 sm:px-0">
                        <Input
                            className="flex-grow"
                            onChange={(e) => setBrandName(e.target.value)}
                            placeholder="Бренд"
                            type="text"
                            value={brandName}
                        />
                        <Button
                            variant={editId ? 'warning' : 'success'}
                            onClick={
                                editId ? handleUpdateBrand : handleAddBrand
                            }
                            className="min-w-28"
                        >
                            {editId ? (
                                <ArrowDownCircleIcon className="h-6 w-6" />
                            ) : (
                                <PlusCircleIcon className="h-6 w-6" />
                            )}
                        </Button>
                    </div>

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage="Бренды не найдены"
                    >
                        {data && (
                            <>
                                <BrandsMobileView
                                    data={data}
                                    getTitle={(item) => item.name || ''}
                                    setBrandName={setBrandName}
                                    setEditId={setEditId}
                                />
                                <BrandsTable
                                    data={data}
                                    setBrandName={setBrandName}
                                    setEditId={setEditId}
                                />
                            </>
                        )}
                    </DataWrapper>
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
