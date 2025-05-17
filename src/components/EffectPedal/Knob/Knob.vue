<template>
  <input type="range" v-model="effectParameter" min="0" max="1" step="0.01" />
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

const effectParameter = defineModel('effectParameter', { default: 1, required: true })
</script>

<style scoped></style>
