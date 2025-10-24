export const ROUTES = {
    account: '/account',
    backstage: {
        root: '/backstage',
        makeupBags: {
            root: '/backstage/makeup-bags',
            add: '/backstage/makeup-bags/add',
            details: (id: string) => `/backstage/makeup-bags/${id}`,
            edit: (id: string) => `/backstage/makeup-bags/${id}/edit`,
        },
        products: {
            root: '/backstage/products',
            add: '/backstage/products/add',
            category: (category: string) =>
                `/backstage/products/category/${category}`,
            details: (id: string) => `/backstage/products/${id}`,
            edit: (id: string) => `/backstage/products/${id}/edit`,
        },
        stages: {
            root: '/backstage/stages',
            add: '/backstage/stages/add',
            details: (id: string) => `/backstage/stages/${id}`,
            edit: (id: string) => `/backstage/stages/${id}/edit`,
        },
    },
    public: {
        makeupBags: {
            root: '/makeup-bags',
            details: (id: string) => `/makeup-bags/${id}`,
        },
        products: {
            root: '/products',
        },
    },
}
