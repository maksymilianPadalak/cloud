<template>
  <nav class="navbar">
    <RouterLink
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      class="nav-link"
      active-class="active"
      >{{ route.name }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { routes } from '@/routes'
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 2rem;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
  box-shadow: 0 2px 12px 0 rgba(44, 62, 80, 0.08);
  align-items: center;
}

.nav-link {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.4em 1.1em;
  border-radius: 0.7em;
  transition:
    background 0.18s,
    color 0.18s,
    box-shadow 0.18s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.13);
  color: #e0e7ff;
  box-shadow: 0 2px 8px 0 rgba(44, 62, 80, 0.1);
}

.active {
  background: #fff;
  color: #6366f1;
  box-shadow: 0 2px 8px 0 rgba(44, 62, 80, 0.13);
}
</style>
