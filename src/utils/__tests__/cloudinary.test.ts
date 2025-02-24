import { Cloudinary } from '@cloudinary/url-gen/index'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { cloudinary } from '../cloudinary'
import config from '../../config'

vi.mock('../../config', () => ({
    default: {
        cloudinary: {
            cloudName: 'test-cloud-name',
        },
    },
}))

describe('cloudinary utility', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should create a Cloudinary instance', () => {
        expect(cloudinary).toBeInstanceOf(Cloudinary)
    })

    it('should configure Cloudinary with the correct cloud name', () => {
        const cloudConfig = cloudinary.getConfig().cloud
        expect(cloudConfig?.cloudName).toBe('test-cloud-name')
        expect(cloudConfig?.cloudName).toBe(config.cloudinary.cloudName)
    })

    it('should export a ready-to-use Cloudinary instance', () => {
        expect(typeof cloudinary.image).toBe('function')
        expect(typeof cloudinary.video).toBe('function')
    })
})
