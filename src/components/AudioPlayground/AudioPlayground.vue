<template>
  <div>
    <div class="root">
      <div class="musicGearWrapper">
        <h2>Amplifier</h2>
        <Amplifier />
      </div>
      <div class="musicGearWrapper">
        <h2>Reverb Pedal</h2>
        <ReverbPedal />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Amplifier from '@/components/Amplifier'
import ReverbPedal from '@/components/Effects/ReverbPedal'
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
