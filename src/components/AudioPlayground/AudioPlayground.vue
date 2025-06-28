<template>
  <div :class="$style.root">
    <div :class="$style.amplifierWrapper">
      <h2>Amplifier</h2>
      <Amplifier />
    </div>
    <!-- <PedalBoard /> -->
  </div>
</template>

<script setup lang="ts">
import Amplifier from '@/components/AmplifierUnit/AmplifierUnit.vue'
</script>

<style module>
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
