import { FieldValues, Path } from 'react-hook-form'

import type { User } from '../users/types'

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

export interface MakeupBagQuestionnaire {
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
    makeupBagPhotoUrl?: string
    makeupTime?: string
    mua?: Pick<User, '_id' | 'username'>
    muaId: string
    name: string
    oilyShine?: string
    peeling?: string
    pores?: string
    problems?: ProblemData
    procedures?: ProcedureData
    referral?: string
    skinType?: string
}

export interface TrainingQuestionnaire {
    _id?: string
    createdAt?: string
    mua?: Pick<User, '_id' | 'username'>
    muaId: string
    name: string
    contact: string
    experience?: string
    difficulties?: string
    expectations: string
}

export interface QuestionnaireOption<T extends FieldValues> {
    id: string
    label: string
    name: Path<T>
    value?: string
}

interface Question<T extends FieldValues> {
    description?: string
    label: string
    options?: QuestionnaireOption<T>[]
}

export interface Questions<T extends FieldValues> {
    [key: string]: Question<T>
}
