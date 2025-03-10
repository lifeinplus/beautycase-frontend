import { setupServer } from 'msw/node'

import { makeupBagsHandlers } from './handlers/makeupBagsHandlers'
import { productsHandlers } from './handlers/productsHandlers'
import { questionnairesHandlers } from './handlers/questionnairesHandlers'
import { stagesHandlers } from './handlers/stagesHandlers'
import { storesHandlers } from './handlers/storesHandlers'
import { toolsHandlers } from './handlers/toolsHandlers'
import { uploadsHandlers } from './handlers/uploadsHandlers'
import { usersHandlers } from './handlers/usersHandlers'

export const server = setupServer(
    ...makeupBagsHandlers,
    ...productsHandlers,
    ...questionnairesHandlers,
    ...stagesHandlers,
    ...storesHandlers,
    ...toolsHandlers,
    ...uploadsHandlers,
    ...usersHandlers
)
