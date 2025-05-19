<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/Navigation/Navigation.vue'
</script>

<template>
  <div>
    <AppNavbar />
    <RouterView />
  </div>
</template>
