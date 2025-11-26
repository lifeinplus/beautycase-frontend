const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    cloudinary: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        defaultAvatarUrl: import.meta.env.VITE_DEFAULT_AVATAR_URL,
        defaultProductId: import.meta.env.VITE_DEFAULT_PRODUCT_ID,
        defaultProductUrl: import.meta.env.VITE_DEFAULT_PRODUCT_URL,
        defaultToolId: import.meta.env.VITE_DEFAULT_TOOL_ID,
        defaultToolUrl: import.meta.env.VITE_DEFAULT_TOOL_URL,
        makeupBag: import.meta.env.VITE_MAKEUP_BAG,
        questionnaireMakeupBag: import.meta.env.VITE_QUESTIONNAIRE_MAKEUP_BAG,
        questionnaireTraining: import.meta.env.VITE_QUESTIONNAIRE_TRAINING,
    },
    fonts: {
        robotoBold: import.meta.env.VITE_FONT_ROBOTO_BOLD,
        robotoRegular: import.meta.env.VITE_FONT_ROBOTO_REGULAR,
    },
    prod: import.meta.env.PROD,
    contactLink: import.meta.env.VITE_CONTACT_LINK,
    contactPhone: import.meta.env.VITE_CONTACT_PHONE,
}

export default config
