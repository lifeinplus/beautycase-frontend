import {
    PaintBrushIcon,
    ShoppingBagIcon,
    ListBulletIcon,
} from '@heroicons/react/24/outline'

import { AdaptiveNavBar, Brands, Footer, Header, Hero, Stages } from '..'

export const MakeupBagPage = () => {
    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center sm:ms-navbar-left lg:ms-navbar-left-open">
                <div className="w-full max-w-2xl">
                    <Hero />
                    <Stages />
                    <Brands />
                </div>
            </main>
            <AdaptiveNavBar>
                <button
                    className="adaptive-nav-bar__button"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    <ShoppingBagIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Косметичка</span>
                </button>

                <button
                    className="adaptive-nav-bar__button"
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
                    className="adaptive-nav-bar__button"
                    onClick={() =>
                        document
                            .getElementById('brands')
                            ?.scrollIntoView({ behavior: 'smooth' })
                    }
                >
                    <PaintBrushIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Кисти</span>
                </button>
            </AdaptiveNavBar>
            <Footer />
        </>
    )
}
