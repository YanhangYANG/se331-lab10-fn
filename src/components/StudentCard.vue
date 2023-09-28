<template>
    <div class="event-class">
      <span>studentname: {{ event.name }} surname {{ event.surname }}</span>
      <h4>gpa:{{ event.gpa }}</h4>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { StudentItem } from '@/type'
  import type { PropType } from 'vue'
  const props = defineProps({
    event: {
      type: Object as PropType<StudentItem>,
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
  </style>