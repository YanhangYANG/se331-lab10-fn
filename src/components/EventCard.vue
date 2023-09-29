<template>
  <RouterLink class="event-link" :to="{name: 'event-detail', params:{id: event?.id}}">
    <div class="event-class">
      <div class="event-card">
        <span>Item id:{{ event?.id}} </span>
        <h4>Item Description:{{ event?.description }}</h4>
        <h5>Type:{{ event?.type }}</h5>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { AuctionItem } from '@/type'
import type { EventOrganizer} from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  event: {
    type: Object as PropType<AuctionItem>,
    required: true
  }
})
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}
.event-link{
  color: #2c3e50;
  text-decoration: none;
}
</style>
