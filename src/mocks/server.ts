import { setupServer } from 'msw/node'

import { toolsHandlers } from './handlers/toolsHandlers'
import { uploadsHandlers } from './handlers/uploadsHandlers'
import { usersHandlers } from './handlers/usersHandlers'

export const server = setupServer(
    ...toolsHandlers,
    ...uploadsHandlers,
    ...usersHandlers
)
