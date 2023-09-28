import type { AxiosInstance, AxiosResponse } from "axios"
import type { EventOrganizer } from "@/type"
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
    getOrganizers(): Promise<AxiosResponse<EventOrganizer[]>> {
        return apiClient.get < EventOrganizer[] > ('/organizers')
    }
}