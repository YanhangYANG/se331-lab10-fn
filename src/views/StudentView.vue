<script setup lang="ts">
import StudentCard from '../components/StudentCard.vue'

import type { StudentItem } from '@/type'

import { ref } from 'vue'
import axios from 'axios'
const events = ref<StudentItem[]>([])
axios.get<StudentItem[]>('http://localhost:3004/student').then((response) => {
  events.value = response.data
})
</script>

<template>
  <main class="events">
    <StudentCard v-for="event in events" :key="event.id" :event="event"></StudentCard>
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
</style>