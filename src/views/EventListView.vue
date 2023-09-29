<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import Cac from '../components/CaC.vue'

import type { AuctionItem } from '@/type'

import { computed, ref} from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { Ref } from 'vue'
import axios, { type AxiosResponse } from 'axios'
import AucService from '@/services/AucService'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'
import BaseInput from "@/components/BaseInput.vue";
const events = ref<AuctionItem[]>([])

const totalEvents = ref<number>(0)

const router = useRouter()

const keyword = ref('')

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: false,
    default: 3
  }
})

AucService.getAuctionItem(3, props.page).then((response: AxiosResponse<AuctionItem[]>) => {
  events.value = response.data
})

AucService.getAuctionItem(3,props.page).then((response: AxiosResponse<AuctionItem[]>) => {
  events.value = response.data
  totalEvents.value = response.headers['x-total-count']
}).catch((error) => {
  router.push({ name: 'NetworkError' })

})

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page);

  let queryFunction;

  if (keyword.value === null || keyword.value === '') {
    queryFunction = AucService.getAuctionItem(3, toPage);
  } else {
    queryFunction = AucService.getEventByKeyword(keyword.value, 3, toPage);
  }

  queryFunction
      .then((response: AxiosResponse<AuctionItem[]>) => {
        events.value = response.data;
        totalEvents.value = response.headers['x-total-count']; // Note: It should be totalEvents, not totalEvent
        next();
      })
      .catch(() => {
        next({ name: 'NetworkError' });
      });
});


const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / props.size)
  return props.page.valueOf() < totalPages
})

function updateKeyword (value: string) {
    let queryFunction;
    if (keyword.value === ''){
        queryFunction = AucService.getAuctionItem(3, 1)
          }else {
        queryFunction = AucService.getEventByKeyword(keyword.value, 3, 1)
          }
    queryFunction.then((response: AxiosResponse<AuctionItem[]>) => {
        events.value = response.data
        console.log('events',events.value)
      totalEvents.value = response.headers['x-total-count']
            console.log('totalEvent',totalEvents.value)
          }).catch(() => {
        router.push({ name: 'NetworkError' })
      })
  }

</script>

<template>
  <h1>Event For Good</h1>

  <main class="flex flex-col items-center">
    <div class="w-64">
    <BaseInput v-model="keyword" type="text" label="Search..." @input="updateKeyword" class="w-full"  />
    </div>
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="pagination">
      <RouterLink
        :to="{ name: 'EventList', query: { page: props.page - 1, size: props.size } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        prev page
      </RouterLink>
      <RouterLink
        :to="{ name: 'EventList', query: { page: props.page + 1, size: props.size } }"
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
