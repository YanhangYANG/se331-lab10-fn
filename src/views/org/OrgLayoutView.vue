<script setup lang="ts">
import { useOrgStore } from '@/stores/org';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useOrgStore();
const org = storeToRefs(store).org;
const id = ref(org?.value?.id);

</script>
<template>
  <div v-if="org">
    <h1>
      {{ org.name }}
    </h1>
    <div id="nav">
      <router-link :to="{ name: 'org-detail' , params:{id} }">Detail</router-link>|
      <router-link :to="{ name: 'org-register' , params:{id} }">Register</router-link>|
      <router-link :to="{ name: 'org-edit' , params:{id} }">Edit</router-link>
    </div>
    <RouterView :org = "org" ></RouterView>
  </div>
</template>