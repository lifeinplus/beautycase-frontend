import { setupServer } from 'msw/node'

import { brandsHandlers } from './handlers/brandsHandlers'
import { categoriesHandlers } from './handlers/categoriesHandlers'
import { lessonsHandlers } from './handlers/lessonsHandlers'
import { makeupBagsHandlers } from './handlers/makeupBagsHandlers'
import { productsHandlers } from './handlers/productsHandlers'
import { questionnairesHandlers } from './handlers/questionnairesHandlers'
import { stagesHandlers } from './handlers/stagesHandlers'
import { storesHandlers } from './handlers/storesHandlers'
import { toolsHandlers } from './handlers/toolsHandlers'
import { uploadsHandlers } from './handlers/uploadsHandlers'
import { usersHandlers } from './handlers/usersHandlers'

export const server = setupServer(
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
