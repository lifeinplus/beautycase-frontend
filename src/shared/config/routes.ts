export const ROUTES = {
    account: '/account',
    backstage: {
        root: '/backstage',
        makeupBags: (id?: string) =>
            id ? `/backstage/makeup-bags/${id}` : '/backstage/makeup-bags',
    },
    public: {
        makeupBags: {
            root: '/makeup-bags',
            details: (id: string) => `/makeup-bags/${id}`,
        },
    },
}
