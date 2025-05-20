<template>
  <div class="root">
    <h1>Reverb Pedal</h1>
    <div class="pedalContent">
      <h2>Decay Time: {{ reverb.decayTime }}</h2>
      <Knob v-model:effect-parameter="reverb.decayTime" />
      <h2>Decay Rate: {{ reverb.decayRate }}</h2>
      <Knob v-model:effect-parameter="reverb.decayRate" />
      <h2>Room Size: {{ reverb.roomSize }}</h2>
      <Knob v-model:effect-parameter="reverb.roomSize" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import { useAmplifier } from '@/composables/useAmplifier'

const { reverb } = useAmplifier()
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pedalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
