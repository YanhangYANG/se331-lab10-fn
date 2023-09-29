import axios, {type AxiosInstance, type AxiosResponse} from "axios";
import {type BidItem} from "@/type";

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    // 其他的配置项
});

export default {
    getBid(perPage : number,page:number): Promise<AxiosResponse<BidItem[]>> {
        return apiClient.get <BidItem[] > ('/bids?_limit=' + perPage + '&_page=' + page)
    },
}