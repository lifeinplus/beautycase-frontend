export const ROUTES = {
    account: '/account',
    backstage: {
        root: '/backstage',
        lessons: {
            root: '/backstage/lessons',
            add: '/backstage/lessons/add',
            details: (id: string) => `/backstage/lessons/${id}`,
            edit: (id: string) => `/backstage/lessons/${id}/edit`,
        },
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
        tools: {
            root: '/backstage/tools',
            add: '/backstage/tools/add',
            details: (id: string) => `/backstage/tools/${id}`,
            edit: (id: string) => `/backstage/tools/${id}/edit`,
        },
    },
    public: {
        lessons: {
            root: '/lessons',
        },
        makeupBags: {
            root: '/makeup-bags',
            details: (id: string) => `/makeup-bags/${id}`,
        },
        products: {
            root: '/products',
            details: (id: string) => `/products/${id}`,
        },
        tools: {
            root: '/tools',
        },
    },
}
