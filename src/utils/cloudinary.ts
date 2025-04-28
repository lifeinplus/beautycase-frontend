import { Cloudinary } from '@cloudinary/url-gen/index'

import config from '../config'

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: config.cloudinary.cloudName,
    },
})

export default cloudinary
