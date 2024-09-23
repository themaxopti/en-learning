interface ServerResponse<T> {
    data: T
    message: string
    statusCode: number
}

export interface CreateDictionaryReq {
    userId: number
    title: string
}

export interface GetDictionariesReq {
    page: number
    limit: number
}

export interface GetDictionaryReq {
    id: number
}

export interface CreateWordReq {
    title: string
    translate: string
    dictionaryId: number
}

export interface CreateWordsReq {
    words: {
        title: string
        translate: string
    }[]
    dictionaryId: number
}

export interface GetWordsReq {
    limit: number
    page: number
    dictionaryId: number
}

export interface DeleteWordReq {
    id: number
    dictionaryId: number
}

export interface DeleteWordsReq {
    wordsId: {
        id: number
    }[]
    dictionaryId: number
}

// 

export type CreateDictionaryRes = ServerResponse<
    {
        id: number
        userId: number | string
        title: string
    }
>

export type GetDictionariesRes = ServerResponse<
    {
        id: number
        userId: number
        title: string
    }[]
>

export type GetDictionaryRes = ServerResponse<
    {
        id: number
        userId: number
        title: string
    }
>

export type CreateWordRes = ServerResponse<
    {
        id: number;
        title: string;
        translate: string;
        dictionaryId: number;
        index: number;
        globalIndex: number;
        userId: number;
    }
>

export type CreateWordsRes = ServerResponse<
    {
        id: number;
        title: string;
        translate: string;
        dictionaryId: number;
        index: number;
        globalIndex: number;
        userId: number
    }[]
>

export type GetWordsRes = ServerResponse<
    {
        id: number;
        title: string;
        translate: string;
        dictionaryId: number;
        index: number;
        globalIndex: number;
        userId: number
    }[]
>

export type DeleteWordRes = ServerResponse<{}>

export type DeleteWordsRes = ServerResponse<{}>
