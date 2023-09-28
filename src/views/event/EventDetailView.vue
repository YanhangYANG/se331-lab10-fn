<!-- EventDetailView.vue -->
<script setup lang="ts">
import { useMessageStore } from "@/stores/message";
import type { PropType } from "vue";
import { type EventItem } from '@/type';
import { ref, watchEffect } from 'vue';

const props = defineProps({
  event: {
    type: Object as unknown as PropType<EventItem>,
    required: true,
  }
});

const store = useMessageStore();
const message = ref(store.message);

watchEffect(() => {
  message.value = store.message;
  if(message.value) {
    setTimeout(() => {
      store.resetMessage();
    }, 3000);
  }
});

</script>

<template>
  <div v-if="event">
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
