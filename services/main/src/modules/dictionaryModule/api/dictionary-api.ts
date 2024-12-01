import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ChangeWordsIndexReq, CreateDictionaryReq, CreateDictionaryRes, CreateWordReq, CreateWordRes, CreateWordsReq, GetDictionaryRes, GetWordsReq, GetWordsRes } from "./dictionary-api.dto";
import { CreateWordsRes, DeleteWordReq, DeleteWordRes, DeleteWordsReq, DeleteWordsRes, GetDictionariesReq, GetDictionariesRes, GetDictionaryReq } from "./dictionary-api.dto";

class DictionaryApi {
    public axiosApi: AxiosInstance
    constructor() {
        this.axiosApi = axios.create({ baseURL: 'http://localhost:3000/api/dictionary', withCredentials: true })
    }

    async createDictionary(data: CreateDictionaryReq): Promise<CreateDictionaryRes> {
        try {
            const res = await this.axiosApi.post(`/create`, data)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async getDictionaries(data: GetDictionariesReq): Promise<GetDictionariesRes> {
        try {
            const { limit, page } = data
            const res = await this.axiosApi.get(`/many/${page}/${limit}`)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async getDictionary(data: GetDictionaryReq): Promise<GetDictionaryRes> {
        try {
            const { id } = data
            const res = await this.axiosApi.get(`/${id}`)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async getWords(data: GetWordsReq): Promise<GetWordsRes> {
        try {
            const { dictionaryId, limit, page } = data
            const res = await this.axiosApi.get(`/words/${dictionaryId}/1000/1`)
            console.log(res);
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async createWords(data: CreateWordsReq): Promise<CreateWordsRes> {
        try {
            const res = await this.axiosApi.post('/words', data)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async createWord(data: CreateWordReq): Promise<CreateWordRes> {
        try {
            const res = await this.axiosApi.post('/word', data)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async deleteWords(data: DeleteWordsReq): Promise<DeleteWordsRes> {
        try {
            const res = await this.axiosApi.delete('/words', { data })
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async deleteWord(data: DeleteWordReq): Promise<DeleteWordRes> {
        try {
            const res = await this.axiosApi.delete('/word', { data })
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async changeWordsIndexes(data: ChangeWordsIndexReq): Promise<{ statusCode: number }> {
        try {
            console.log(data);
            
            const res = await this.axiosApi.post('/words/changeIndex', data )
            return res.data
        } catch (e) {
            console.log(e);
        }
    }
}

export const dictionaryApi = new DictionaryApi()