import {
    PaintBrushIcon,
    ShoppingBagIcon,
    ListBulletIcon,
} from '@heroicons/react/24/outline'

const AdaptiveNavBar = () => (
    <aside className="lg:w-navbar-left-open fixed bottom-0 left-0 z-20 flex w-full border-t border-gray-700 bg-black text-white sm:h-full sm:w-auto sm:flex-col sm:border-e sm:border-t-0 sm:border-gray-800 sm:px-3 sm:pb-5 sm:pt-2">
        <div className="mt-3 hidden flex-col px-3 pb-10 pt-3 sm:flex">
            <h1 className="font-logo text-2xl font-bold">
                <a href="/">
                    <span className="lg:hidden">B</span>
                    <span className="hidden lg:inline">Beautycase</span>
                </a>
            </h1>
        </div>
        <div className="flex w-full flex-row justify-evenly sm:flex-col">
            <button
                className="my-1 flex p-3 hover:text-rose-400 lg:gap-4"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="hidden lg:inline">Косметичка</span>
            </button>

            <button
                className="my-1 flex p-3 hover:text-rose-400 lg:gap-4"
                onClick={() =>
                    document
                        .getElementById('stages')
                        ?.scrollIntoView({ behavior: 'smooth' })
                }
            >
                <ListBulletIcon className="h-6 w-6" />
                <span className="hidden lg:inline">Этапы</span>
            </button>

            <button
                className="my-1 flex p-3 hover:text-rose-400 lg:gap-4"
                onClick={() =>
                    document
                        .getElementById('brushes')
                        ?.scrollIntoView({ behavior: 'smooth' })
                }
            >
                <PaintBrushIcon className="h-6 w-6" />
                <span className="hidden lg:inline">Кисти</span>
            </button>
        </div>
    </aside>
)

export default AdaptiveNavBar
