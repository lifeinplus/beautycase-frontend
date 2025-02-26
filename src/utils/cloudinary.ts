import { Cloudinary } from '@cloudinary/url-gen/index'

import config from '../config'

export const cloudinary = new Cloudinary({
    cloud: {
        cloudName: config.cloudinary.cloudName,
    },
})
