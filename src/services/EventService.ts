import type { AxiosInstance, AxiosResponse } from "axios"
import type { EventItem } from "@/type"
import axios from "axios";

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
    getEvent(perPage : number,page:number): Promise<AxiosResponse<EventItem[]>> {
        return apiClient.get < EventItem[] > ('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEventById(id: number): Promise<AxiosResponse<EventItem>> {
        return apiClient.get < EventItem > ('/events/' + id.toString())
    },
    saveEvent(event: EventItem): Promise<AxiosResponse<EventItem>> {
        return apiClient.post < EventItem > ('/events', event)
    },
    getEventByKeyword(keyword: string,perPage: number,page:number): Promise<AxiosResponse<EventItem[]>> {
        return apiClient.get < EventItem[] > ('/events?title=' +keyword + '&_limit=' + perPage + '&_page=' + page)
    }
}
