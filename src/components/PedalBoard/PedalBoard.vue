<template>
  <div :class="$style.pedalWrapper">
    <h2>Pedal Board</h2>
    <div :class="$style.pedalBoard">
      <ReverbPedal />
      <DelayPedal />
      <ChorusPedal />
      <DistortionPedal />
    </div>
  </div>
</template>

<script setup lang="ts">
import ReverbPedal from '@/components/Effects/ReverbPedal'
import DelayPedal from '@/components/Effects/DelayPedal'
import ChorusPedal from '@/components/Effects/ChorusPedal'
import DistortionPedal from '@/components/Effects/DistortionPedal'
</script>

<style module>
.pedalBoard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 50px;
  padding: 40px;
  border: 5px solid lightgray;
  border-radius: 20px;
}

.pedalWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
