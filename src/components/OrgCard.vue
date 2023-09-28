<template>
  <RouterLink class="event-link" :to="{name: 'org-detail', params:{id: org?.id}}">
    <div class="event-class">
      <div class="event-card">
        <span>Id:{{ org?.id }} </span>
        <h4>OrgName: {{ org?.name }}</h4>
        <h4>Address:{{ org?.address }}</h4>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { OrgItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  org: {
    type: Object as PropType<OrgItem>,
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