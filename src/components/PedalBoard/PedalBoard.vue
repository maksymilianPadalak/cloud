<template>
  <div class="pedalBoard">
    <ReverbPedal />
    <DelayPedal />
    <ChorusPedal />
    <DistortionPedal />
  </div>
</template>

<script setup lang="ts">
import ReverbPedal from '@/components/Effects/ReverbPedal'
import DelayPedal from '@/components/Effects/DelayPedal'
import ChorusPedal from '@/components/Effects/ChorusPedal'
import DistortionPedal from '@/components/Effects/DistortionPedal'
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
