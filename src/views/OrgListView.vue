<script setup lang="ts">
import OrgCard from '../components/OrgCard.vue'
import Cac from '../components/CaC.vue'

import type { OrgItem } from '@/type'

import { computed, ref} from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { Ref } from 'vue'
import axios, { type AxiosResponse } from 'axios'
import OrgService from '@/services/OrgService'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'
const orgs = ref<OrgItem[]>([])

const totalOrgs = ref<number>(0)

const router = useRouter()

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: false,
    default: 4
  }
})

OrgService.getOrg(4, props.page).then((response: AxiosResponse<OrgItem[]>) => {
  orgs.value = response.data
})

OrgService.getOrg(4,props.page).then((response: AxiosResponse<OrgItem[]>) => {
  orgs.value = response.data
  totalOrgs.value = response.headers['x-total-count']
}).catch((error) => {
  router.push({ name: 'NetworkError' })

})

onBeforeRouteUpdate((to, from, next) => {
  const topage = Number(to.query.page)

  OrgService.getOrg(4, topage).then((response: AxiosResponse<OrgItem[]>) => {
    orgs.value = response.data
    totalOrgs.value = response.headers['x-total-count']
    next()
  }).catch(() => {
    next({ name: 'NetworkError' })


  })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalOrgs.value / props.size)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1>Event For Good</h1>

  <main class="events">
    <OrgCard v-for="org in orgs" :key="org.id" :org="org"></OrgCard>
    <div class="pagination">
      <RouterLink
          :to="{ name: 'about', query: { page: props.page - 1, size: props.size } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
      >
        prev page
      </RouterLink>
      <RouterLink
          :to="{ name: 'about', query: { page: props.page + 1, size: props.size } }"
          rel="next"
          v-if="hasNextPage"
          id="page-next"
      >
        Next page
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;

  text-align: right;
}
h4 {
  font-size: 20px;
}
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
