interface DesiredSkillData {
    bright?: boolean
    delicate?: boolean
    evening?: boolean
    office?: boolean
    filming?: boolean
}

interface ProblemData {
    eyeshadowCrease?: boolean
    eyeshadowMatch?: boolean
    foundationPores?: boolean
    foundationStay?: boolean
    mascaraSmudge?: boolean
    sculpting?: boolean
}

interface ProcedureData {
    browCorrection?: boolean
    lashExtensions?: boolean
    lashLamination?: boolean
    none?: boolean
}

export interface Questionnaire {
    _id?: string
    createdAt?: string
    age?: number
    allergies?: string
    budget?: string
    brushes?: string
    city?: string
    currentSkills?: string
    desiredSkills?: DesiredSkillData
    instagram?: string
    makeupBag: string
    makeupBagPhotoId?: string
    makeupBagPhotoFile?: File
    makeupTime?: string
    name: string
    oilyShine?: string
    peeling?: string
    pores?: string
    problems?: ProblemData
    procedures?: ProcedureData
    referral?: string
    skinType?: string
}
