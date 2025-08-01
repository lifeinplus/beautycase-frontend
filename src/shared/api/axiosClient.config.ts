import axios from 'axios'

import config from '@/app/config'

export default axios.create({
    baseURL: config.apiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})
