import { setupServer } from 'msw/node'

import brandsHandlers from '../../features/brands/__mocks__/brandsApiSlice'
import categoriesHandlers from '../../features/categories/__mocks__/categoriesApiSlice'
import lessonsHandlers from '../../features/lessons/__mocks__/lessonsApiSlice'
import makeupBagsHandlers from '../../features/makeupBags/__mocks__/makeupBagsApiSlice'
import productsHandlers from '../../features/products/__mocks__/productApiSlice'
import questionnairesHandlers from '../../features/questionnaires/__mocks__/questionnaireApiSlice'
import stagesHandlers from '../../features/stages/__mocks__/stagesApiSlice'
import storesHandlers from '../../features/stores/__mocks__/storesApiSlice'
import toolsHandlers from '../../features/tools/__mocks__/toolsApiSlice'
import uploadsHandlers from '../../features/uploads/__mocks__/uploadApiSlice'
import usersHandlers from '../../features/users/__mocks__/usersApiSlice'

const server = setupServer(
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
