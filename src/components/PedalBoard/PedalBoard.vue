<template>
  <div class="pedalBoard">
    <div class="pedalWrapper">
      <h2>Reverb Pedal</h2>
      <ReverbPedal />
    </div>

    <div class="pedalWrapper">
      <h2>Delay Pedal</h2>
      <ReverbPedal />
    </div>

    <div class="pedalWrapper">
      <h2>Chorus Pedal</h2>
      <ReverbPedal />
    </div>

    <div class="pedalWrapper">
      <h2>Distortion Pedal</h2>
      <ReverbPedal />
    </div>
  </div>
</template>

<script setup lang="ts">
import ReverbPedal from '@/components/Effects/ReverbPedal'
</script>

<style scoped>
.pedalBoard {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 40px;
  border: 5px solid lightblue;
  border-radius: 20px;

  @media screen and (min-width: 1400px) {
    flex-direction: row;
    gap: 20px;
  }
}

.pedalWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
