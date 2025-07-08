import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import { setupStore } from './app/store.ts'
import './app/styles/index.css'
import './lib/i18n/index.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={setupStore()}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
