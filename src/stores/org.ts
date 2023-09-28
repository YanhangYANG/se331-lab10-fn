import type { OrgItem } from "@/type";
import { defineStore } from "pinia";
export const useOrgStore = defineStore('org',{
    state: () => ({
        org : null as OrgItem | null
    }),
    actions: {
        setOrg(org: OrgItem) {
            this.org = org;

        }
    }
})