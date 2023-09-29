import axios, {type AxiosInstance, type AxiosResponse} from "axios";
import {type AuctionItem} from "@/type";

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
    getAuctionItem(perPage : number,page:number): Promise<AxiosResponse<AuctionItem[]>> {
        return apiClient.get < AuctionItem[] > ('/auctionitems?_limit=' + perPage + '&_page=' + page)
    },
    getAuctionItemById(id: number): Promise<AxiosResponse<AuctionItem>> {
        return apiClient.get < AuctionItem > ('/auctionitems/' + id.toString())
    },
    saveAuctionItem(event: AuctionItem): Promise<AxiosResponse<AuctionItem>> {
        return apiClient.post < AuctionItem > ('/auctionitems', event)
    },
    getEventByKeyword(keyword: string,perPage: number,page:number): Promise<AxiosResponse<AuctionItem[]>> {
        return apiClient.get < AuctionItem[] > ('/auctionitems?description=' +keyword + '&_limit=' + perPage + '&_page=' + page)
    }
}