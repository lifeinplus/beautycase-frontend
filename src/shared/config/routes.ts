export const ROUTES = {
    account: '/account',
    home: '/',
    backstage: {
        root: '/backstage',
        lessons: {
            root: '/backstage/lessons',
            add: '/backstage/lessons/add',
            details: (id: string) => `/backstage/lessons/${id}`,
            edit: (id: string) => `/backstage/lessons/${id}/edit`,
            products: (id: string) => `/backstage/lessons/${id}/products`,
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
            links: (id: string) => `/backstage/products/${id}/links`,
        },
        stages: {
            root: '/backstage/stages',
            add: '/backstage/stages/add',
            details: (id: string) => `/backstage/stages/${id}`,
            edit: (id: string) => `/backstage/stages/${id}/edit`,
            products: (id: string) => `/backstage/stages/${id}/products`,
        },
        tools: {
            root: '/backstage/tools',
            add: '/backstage/tools/add',
            details: (id: string) => `/backstage/tools/${id}`,
            edit: (id: string) => `/backstage/tools/${id}/edit`,
            links: (id: string) => `/backstage/tools/${id}/links`,
        },
    },
    confirmation: '/confirmation',
    controlCenter: {
        root: '/control-center',
        referenceLists: {
            root: '/control-center/reference-lists',
            brands: '/control-center/reference-lists/brands',
            categories: '/control-center/reference-lists/categories',
            stores: '/control-center/reference-lists/stores',
        },
        users: '/control-center/users',
    },
    lessons: {
        root: '/lessons',
        details: (id: string) => `/lessons/${id}`,
    },
    login: '/login',
    makeupBags: {
        root: '/makeup-bags',
        details: (id: string) => `/makeup-bags/${id}`,
    },
    products: {
        root: '/products',
        details: (id: string) => `/products/${id}`,
    },
    pricing: '/pricing',
    questionnaires: {
        root: '/questionnaires',
        makeupBags: {
            root: '/questionnaires/makeup-bags',
            create: '/questionnaires/makeup-bag',
            result: (id: string) => `/questionnaires/makeup-bags/${id}`,
        },
        trainings: {
            root: '/questionnaires/trainings',
            create: '/questionnaires/training',
            result: (id: string) => `/questionnaires/trainings/${id}`,
        },
    },
    register: '/register',
    tools: {
        root: '/tools',
        details: (id: string) => `/tools/${id}`,
    },
    unauthorized: '/unauthorized',
}
