import { setupServer } from 'msw/node'

import authHandlers from '@/features/auth/api/__mocks__/authApi'
import brandsHandlers from '@/features/brands/api/__mocks__/brandsApi'
import categoriesHandlers from '@/features/categories/api/__mocks__/categoriesApi'
import lessonsHandlers from '@/features/lessons/api/__mocks__/lessonsApi'
import makeupBagsHandlers from '@/features/makeup-bags/api/__mocks__/makeupBagsApi'
import productsHandlers from '@/features/products/api/__mocks__/productsApi'
import questionnairesHandlers from '@/features/questionnaires/api/__mocks__/questionnairesApi'
import stagesHandlers from '@/features/stages/api/__mocks__/stagesApi'
import storesHandlers from '@/features/stores/api/__mocks__/storesApi'
import toolsHandlers from '@/features/tools/api/__mocks__/toolsApi'
import uploadsHandlers from '@/features/uploads/api/__mocks__/uploadsApi'
import usersHandlers from '@/features/users/api/__mocks__/usersApi'

const server = setupServer(
    ...authHandlers,
    ...brandsHandlers,
    ...categoriesHandlers,
    ...lessonsHandlers,
    ...makeupBagsHandlers,
    ...productsHandlers,
    ...questionnairesHandlers,
    ...stagesHandlers,
    ...storesHandlers,
    ...toolsHandlers,
    ...uploadsHandlers,
    ...usersHandlers
)

export default server
