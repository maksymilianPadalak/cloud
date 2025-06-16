<template>
  <div>
    <div class="root">
      <div class="amplifierWrapper">
        <h2>Amplifier</h2>
        <Amplifier />
      </div>
      <PedalBoard />
    </div>
  </div>
</template>

<script setup lang="ts">
import Amplifier from '@/components/Amplifier'
import PedalBoard from '@/components/PedalBoard/PedalBoard.vue'
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px;
  gap: 50px;
}

.amplifierWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
