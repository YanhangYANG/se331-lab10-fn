import type { AxiosInstance, AxiosResponse } from "axios"
import type { OrgItem } from "@/type"
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
    getOrg(perPage : number,page:number): Promise<AxiosResponse<OrgItem[]>> {
        return apiClient.get < OrgItem[] > ('/orgs?_limit=' + perPage + '&_page=' + page)
    },
    getOrgById(id: number): Promise<AxiosResponse<OrgItem>> {
        return apiClient.get < OrgItem > ('/orgs/' + id.toString())
    },
    saveOrg(org: OrgItem): Promise<AxiosResponse<OrgItem>> {
        return apiClient.post < OrgItem > ('/orgs', org)
    }

}