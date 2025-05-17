<template>
  <div>
    <div class="root">
      <h1>PEDAL BOARD</h1>
      <DelayPedal></DelayPedal>
    </div>
  </div>
</template>

<script setup lang="ts">
import DelayPedal from '@/components/Effects/DelayPedal'
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px;
}
</style>
