interface ProcedureData {
    lashExtensions?: boolean
    browCorrection?: boolean
    lashLamination?: boolean
    none?: boolean
}

interface DesiredSkillData {
    delicate?: boolean
    evening?: boolean
    bright?: boolean
    office?: boolean
}

interface ProblemData {
    eyeshadowCrease?: boolean
    mascaraSmudge?: boolean
    foundationPores?: boolean
    foundationStay?: boolean
    sculpting?: boolean
    eyeshadowMatch?: boolean
}

export interface Questionnaire {
    name: string
    instagram: string
    city?: string
    age?: number
    makeupBag: string
    procedures: ProcedureData
    skinType?: string
    allergies?: string
    peeling?: string
    pores?: boolean
    oilyShine?: boolean
    currentSkills?: string
    desiredSkills: DesiredSkillData
    makeupTime?: string
    budget?: string
    brushes?: boolean
    problems: ProblemData
    referral?: string
}
