const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    cloudinary: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        defaultThumbnailName: import.meta.env.VITE_DEFAULT_THUMBNAIL_NAME,
        defaultThumbnailUrl: import.meta.env.VITE_DEFAULT_THUMBNAIL_URL,
    },
    prod: import.meta.env.PROD,
}

export default config
