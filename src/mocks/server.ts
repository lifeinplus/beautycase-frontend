import { setupServer } from 'msw/node'

import { stagesHandlers } from './handlers/stagesHandlers'
import { storesHandlers } from './handlers/storesHandlers'
import { toolsHandlers } from './handlers/toolsHandlers'
import { uploadsHandlers } from './handlers/uploadsHandlers'
import { usersHandlers } from './handlers/usersHandlers'

export const server = setupServer(
    ...stagesHandlers,
    ...storesHandlers,
    ...toolsHandlers,
    ...uploadsHandlers,
    ...usersHandlers
)
