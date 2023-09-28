<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore();
const { message } = storeToRefs(store);
</script>

<template>
  <header>
    <div id="flashMessage" v-if="message">
     <h4>{{ message }}</h4>
    </div>
    <nav>
      <RouterLink :to="{ name: 'EventList' }">Home</RouterLink> | 
      <RouterLink :to="{ name: 'about' }">Organizers</RouterLink> |
      <RouterLink :to="{ name: 'add-org' }">New Organizer</RouterLink> |
      <RouterLink :to="{ name: 'add-event' }">New Event</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
.page-sizes {
  display: flex;
  gap: 10px;
}

.page-sizes a {
  margin: 0 10px;
}
@keyframes yellowfade {
  fron{
    background: yellow;
  }
  to{
    background: transparent
  }
}

#flashMessage {
  animation: yellowfade 3s ease-in-out;
}
</style>
