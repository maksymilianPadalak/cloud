<template>
  <EffectPedal title="Distortion Pedal">
    <div class="pedalContent">
      <h2>Drive: {{ drive }}</h2>
      <Knob v-model:effect-parameter="drive" />
      <h2>Tone: {{ tone }}</h2>
      <Knob v-model:effect-parameter="tone" />
    </div>
  </EffectPedal>
</template>

<script setup lang="ts">
import Knob from '@/components/Knob/Knob.vue'
import EffectPedal from '@/components/EffectPedal/EffectPedal.vue'
import { ref } from 'vue'

const drive = ref(5.5)
const tone = ref(5.5)
</script>

<style scoped>
.pedalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>
