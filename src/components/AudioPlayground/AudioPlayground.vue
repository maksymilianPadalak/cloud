<template>
  <div>
    <div class="root">
      <div class="musicGearWrapper">
        <h2>Amplifier</h2>
        <Amplifier />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Amplifier from '../Amplifier/Amplifier.vue'
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

.musicGearWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
