const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    cloudinary: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        defaultAvatarUrl: import.meta.env.VITE_DEFAULT_AVATAR_URL,
        defaultThumbnailName: import.meta.env.VITE_DEFAULT_THUMBNAIL_NAME,
        defaultThumbnailUrl: import.meta.env.VITE_DEFAULT_THUMBNAIL_URL,
        makeupBagHero: import.meta.env.VITE_MAKEUP_BAG_HERO,
    },
    fonts: {
        robotoBold: import.meta.env.VITE_FONT_ROBOTO_BOLD,
        robotoRegular: import.meta.env.VITE_FONT_ROBOTO_REGULAR,
    },
    prod: import.meta.env.PROD,
}

export default config
