import { setupServer } from 'msw/node'

import authHandlers from '../../features/auth/__mocks__/authApi'
import brandsHandlers from '../../features/brands/__mocks__/brandsApi'
import categoriesHandlers from '../../features/categories/__mocks__/categoriesApi'
import lessonsHandlers from '../../features/lessons/__mocks__/lessonsApi'
import makeupBagsHandlers from '../../features/makeupBags/__mocks__/makeupBagsApi'
import productsHandlers from '../../features/products/__mocks__/productsApi'
import questionnairesHandlers from '../../features/questionnaires/__mocks__/questionnairesApi'
import stagesHandlers from '../../features/stages/__mocks__/stagesApi'
import storesHandlers from '../../features/stores/__mocks__/storesApi'
import toolsHandlers from '../../features/tools/__mocks__/toolsApi'
import uploadsHandlers from '../../features/uploads/__mocks__/uploadsApi'
import usersHandlers from '../../features/users/__mocks__/usersApi'

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
